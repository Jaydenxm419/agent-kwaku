import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api.js";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrain02Icon,
  InformationCircleIcon,
  CheckmarkCircle02Icon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";

interface AnthropicModel {
  id: string;
  display_name: string;
  created_at: string;
  max_input_tokens: number;
  max_tokens: number;
  capabilities: {
    image_input?: { supported: boolean };
    structured_outputs?: { supported: boolean };
    thinking?: { supported: boolean };
  };
}

export function SettingsPanel({ isDark }: { isDark: boolean }) {
  const [models, setModels] = useState<AnthropicModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const activeModel = useQuery(api.settings.getActiveModel);
  const setActiveModelMutation = useMutation(api.settings.setActiveModel);

  // Use a fallback while loading or if no model is set
  const currentModelId = activeModel ?? "claude-3-5-sonnet-latest";

  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await fetch("/api/models");
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to fetch models");
        }
        const data = await res.json();
        setModels(data.data || []);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchModels();
  }, []);

  const handleModelChange = async (modelId: string) => {
    setSaving(true);
    try {
      await setActiveModelMutation({ model: modelId });
    } catch (err) {
      console.error("Failed to update model", err);
    } finally {
      setSaving(false);
    }
  };

  const selectedModelData = models.find((m) => m.id === currentModelId);

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div>
        <h2 className={`text-2xl font-semibold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
          Settings
        </h2>
        <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          Configure global agent behavior and model selection.
        </p>
      </div>

      <div className={`p-6 rounded-2xl border ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500">
            <HugeiconsIcon icon={AiBrain02Icon} size={24} />
          </div>
          <div>
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Model Selection</h3>
            <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              Choose which Claude model powers your agent's reasoning.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className={`block text-xs font-medium uppercase tracking-wider mb-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              Active Model
            </label>
            <div className="relative">
              <select
                value={currentModelId}
                onChange={(e) => handleModelChange(e.target.value)}
                disabled={loading || saving}
                className={`w-full appearance-none px-4 py-3 rounded-xl border outline-none transition-all ${
                  isDark 
                    ? "bg-slate-950 border-slate-800 text-slate-200 focus:border-sky-500/50" 
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-500/50"
                }`}
              >
                {activeModel === undefined && (
                  <option value={currentModelId}>Loading active model...</option>
                )}
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.display_name} ({m.id})
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
                {saving && <HugeiconsIcon icon={Loading03Icon} size={16} className="animate-spin text-sky-500" />}
                <div className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] ${isDark ? "border-t-slate-600" : "border-t-slate-400"}`} />
              </div>
            </div>
            {error && (
              <p className="mt-2 text-xs text-rose-500">Error loading models: {error}</p>
            )}
            {!loading && models.length === 0 && !error && (
              <p className="mt-2 text-xs text-amber-500">No models found in your Anthropic account.</p>
            )}
          </div>

          {selectedModelData && (
            <div className={`p-4 rounded-xl border animate-in fade-in slide-in-from-top-2 duration-300 ${isDark ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-100"}`}>
              <div className="flex items-start gap-3 mb-4">
                <HugeiconsIcon icon={InformationCircleIcon} size={18} className="text-sky-500 mt-0.5" />
                <div>
                  <h4 className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                    Model Details: {selectedModelData.display_name}
                  </h4>
                  <p className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    Released on {new Date(selectedModelData.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-lg border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                  <span className={`block text-[10px] uppercase tracking-tighter mb-1 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                    Context Window
                  </span>
                  <span className={`text-sm mono font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    {selectedModelData.max_input_tokens.toLocaleString()} tokens
                  </span>
                </div>
                <div className={`p-3 rounded-lg border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                  <span className={`block text-[10px] uppercase tracking-tighter mb-1 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                    Max Output
                  </span>
                  <span className={`text-sm mono font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    {selectedModelData.max_tokens.toLocaleString()} tokens
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedModelData.capabilities.image_input?.supported && (
                  <Badge isDark={isDark} label="Vision Support" />
                )}
                {selectedModelData.capabilities.structured_outputs?.supported && (
                  <Badge isDark={isDark} label="Structured Outputs" />
                )}
                {selectedModelData.capabilities.thinking?.supported && (
                  <Badge isDark={isDark} label="Thinking (Reasoning)" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Badge({ label, isDark }: { label: string; isDark: boolean }) {
  return (
    <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${
      isDark 
        ? "bg-sky-500/10 border-sky-500/20 text-sky-400" 
        : "bg-sky-50 border-sky-100 text-sky-600"
    }`}>
      <HugeiconsIcon icon={CheckmarkCircle02Icon} size={10} />
      {label}
    </span>
  );
}

import React from "react";
import { X, Trash2, Calendar, Sparkles, Download, ArrowRight } from "lucide-react";
import { SavedScan } from "../types";
import { downloadReportFile } from "../utils/reportGenerator";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedScans: SavedScan[];
  onSelectScan: (scan: SavedScan) => void;
  onDeleteScan: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  savedScans,
  onSelectScan,
  onDeleteScan,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-900 text-stone-100">
          <div>
            <h3 className="font-semibold text-base font-display">
              Saved Waste Inventions
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {savedScans.length} item{savedScans.length !== 1 ? "s" : ""} recorded in browser
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scan List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/40">
          {savedScans.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 mx-auto flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-stone-800">
                No saved blueprints yet
              </h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Any item you analyze is automatically preserved here so you can revisit build instructions later.
              </p>
            </div>
          ) : (
            savedScans.map((scan) => (
              <div
                key={scan.id}
                className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs hover:border-emerald-500/60 transition-all group flex flex-col gap-2.5"
              >
                <div className="flex items-start gap-3">
                  {scan.thumbnail && (
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                      <img
                        src={scan.thumbnail}
                        alt={scan.objectName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {scan.objectName}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate mt-0.5">
                      {scan.material}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {scan.date}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700 font-medium">
                        3 Inventions
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteScan(scan.id)}
                    title="Delete record"
                    className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg transition-colors opacity-60 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                  <button
                    onClick={() => downloadReportFile(scan.result)}
                    className="text-stone-500 hover:text-stone-800 inline-flex items-center gap-1 text-[11px]"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download TXT</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectScan(scan);
                      onClose();
                    }}
                    className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 text-[11px]"
                  >
                    <span>View Blueprint</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedScans.length > 0 && (
          <div className="p-4 border-t border-stone-100 bg-white flex justify-between items-center text-xs">
            <button
              onClick={onClearAll}
              className="text-stone-400 hover:text-red-600 transition-colors"
            >
              Clear All Scans
            </button>
            <span className="text-stone-400 text-[11px]">
              Stored privately in browser
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

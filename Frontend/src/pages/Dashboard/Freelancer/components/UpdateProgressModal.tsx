import { useState } from 'react';
import { X, TrendingUp } from 'lucide-react';
import { updateProjectProgress } from '../../../../services/api';
import toast from 'react-hot-toast';

interface UpdateProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  currentProgress: number;
  projectTitle: string;
  onProgressUpdated: () => void;
}

const PROGRESS_OPTIONS = [
  { value: 10, label: '10%', description: 'Just started' },
  { value: 20, label: '20%', description: 'Initial work' },
  { value: 40, label: '40%', description: 'First draft' },
  { value: 60, label: '60%', description: 'Halfway done' },
  { value: 80, label: '80%', description: 'Almost complete' },
  { value: 100, label: '100%', description: 'Completed' },
];

const UpdateProgressModal = ({
  isOpen,
  onClose,
  projectId,
  currentProgress,
  projectTitle,
  onProgressUpdated,
}: UpdateProgressModalProps) => {
  const [selectedProgress, setSelectedProgress] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen) return null;

  const handleUpdate = async () => {
    if (selectedProgress === null) {
      toast.error('Please select a progress percentage');
      return;
    }

    if (selectedProgress <= currentProgress && selectedProgress !== 100) {
      toast.error('Progress must be greater than current progress');
      return;
    }

    setIsUpdating(true);
    try {
      await updateProjectProgress(projectId, selectedProgress);
      
      if (selectedProgress === 100) {
        toast.success('Project marked as completed! 🎉');
      } else {
        toast.success(`Progress updated to ${selectedProgress}%`);
      }
      
      onProgressUpdated();
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update progress');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Update Progress</h2>
              <p className="text-sm text-gray-500 mt-1">{projectTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Current Progress */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Current Progress</span>
              <span className="text-lg font-bold text-blue-600">{currentProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>

          {/* Progress Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select New Progress Level
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PROGRESS_OPTIONS.map((option) => {
                const isDisabled = option.value <= currentProgress && option.value !== 100;
                const isSelected = selectedProgress === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => !isDisabled && setSelectedProgress(option.value)}
                    disabled={isDisabled}
                    className={`
                      p-4 rounded-lg border-2 transition-all text-left
                      ${isSelected
                        ? 'border-blue-600 bg-blue-50'
                        : isDisabled
                        ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xl font-bold ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
                        {option.label}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-600">{option.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info Message */}
          {selectedProgress === 100 && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <span className="font-semibold">Note:</span> Setting progress to 100% will mark the project as completed.
              </p>
            </div>
          )}

          {selectedProgress !== null && selectedProgress !== 100 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                Progress will be updated from <span className="font-semibold">{currentProgress}%</span> to{' '}
                <span className="font-semibold">{selectedProgress}%</span>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t">
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isUpdating || selectedProgress === null}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isUpdating ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Updating...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4" />
                Update Progress
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProgressModal;

import { Search, Inbox, FolderOpen, MessageSquare, FileText, Users } from 'lucide-react';

interface EmptyStateProps {
  icon?: 'search' | 'inbox' | 'folder' | 'message' | 'file' | 'users';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ 
  icon = 'inbox', 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  const icons = {
    search: Search,
    inbox: Inbox,
    folder: FolderOpen,
    message: MessageSquare,
    file: FileText,
    users: Users,
  };

  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon size={40} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-[#0084FF] hover:bg-[#0066CC] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function NoProjectsFound({ onPostProject }: { onPostProject?: () => void }) {
  return (
    <EmptyState
      icon="folder"
      title="No projects found"
      description="Start by posting your first project and connect with talented Researchers worldwide."
      actionLabel="Post a Project"
      onAction={onPostProject}
    />
  );
}

export function NoSearchResults() {
  return (
    <EmptyState
      icon="search"
      title="No results found"
      description="Try adjusting your search terms or filters to find what you're looking for."
    />
  );
}

export function NoMessages() {
  return (
    <EmptyState
      icon="message"
      title="No messages yet"
      description="Start a conversation with Researchers or clients to discuss your projects."
    />
  );
}

export function NoProposals({ onBrowseProjects }: { onBrowseProjects?: () => void }) {
  return (
    <EmptyState
      icon="file"
      title="No proposals yet"
      description="Browse available projects and submit proposals to start earning."
      actionLabel="Browse Projects"
      onAction={onBrowseProjects}
    />
  );
}

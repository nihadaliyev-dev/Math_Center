import React, { useState, useEffect } from 'react';
import { Folder, ChevronDown, LayoutGrid, Lock, Unlock, FileText, Calendar } from 'lucide-react';
import { getUserRepositories } from '@/services/researchService';
import type { Repository } from '@/types/researchTypes';

const RepositoryCard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      const data = await getUserRepositories();
      setRepositories(data);
      if (data.length > 0) {
        setSelectedRepo(data[0]);
      }
    } catch (error) {
      console.error('Error fetching repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (repoId: string) => {
    // TODO: Implement actual API call to toggle visibility
    // await api.put(`/repositories/${repoId}/visibility`);
    
    setRepositories(prev => 
      prev.map(repo => 
        repo.id === repoId 
          ? { ...repo, isPublic: !repo.isPublic }
          : repo
      )
    );
    
    if (selectedRepo?.id === repoId) {
      setSelectedRepo(prev => prev ? { ...prev, isPublic: !prev.isPublic } : null);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mathematical analysis':
        return '∫';
      case 'algebra':
        return '𝕏';
      case 'applied mathematics':
        return '📊';
      case 'geometry':
        return '△';
      case 'statistics':
        return '📈';
      default:
        return '📁';
    }
  };

  if (loading) {
    return (
      <div className="rounded-[2rem] px-[2rem] py-[1.5rem] bg-white animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] px-[2rem] py-[1.5rem] bg-white h-full">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex cursor-pointer items-center gap-[0.25rem]">
            <button className="p-[1.25rem] bg-black dark:bg-white rounded-full text-white dark:text-black">
              <Folder />
            </button>
            <button>
              <ChevronDown className="w-[1rem]" />
            </button>
            <p className="text-sm font-medium">Math Repositories</p>
          </div>
          <div>
            <LayoutGrid className="w-5 h-5 text-gray-600" />
          </div>
        </div>
        
        <div className="flex flex-col gap-[0.5rem] overflow-y-auto flex-1">
          {repositories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Folder className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-sm text-gray-500 mb-1">No repositories yet</p>
              <p className="text-xs text-gray-400">Create your first mathematical research repository</p>
            </div>
          ) : (
            repositories.map((repo) => (
              <div
                key={repo.id}
                onClick={() => setSelectedRepo(repo)}
                className={`group cursor-pointer rounded-xl border transition-all duration-200 hover:shadow-md ${
                  selectedRepo?.id === repo.id 
                    ? 'border-blue-200 bg-blue-50 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="text-2xl">{getCategoryIcon(repo.category)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sm text-gray-900 truncate">
                            {repo.name}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleVisibility(repo.id);
                            }}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            title={repo.isPublic ? 'Make private' : 'Make public'}
                          >
                            {repo.isPublic ? (
                              <Unlock className="w-3 h-3 text-green-500" />
                            ) : (
                              <Lock className="w-3 h-3 text-gray-400" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{repo.category}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {repo.fileCount} files
                          </span>
                          <span>{repo.size}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {repo.lastModified}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedRepo?.id === repo.id && (
                  <div className="border-t border-blue-100 px-4 py-3 bg-blue-25">
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={repo.isPublic ? 'text-green-600' : 'text-gray-500'}>
                          {repo.isPublic ? 'Public' : 'Private'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last modified:</span>
                        <span>{repo.lastModified}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total size:</span>
                        <span>{repo.size}</span>
                      </div>
                    </div>
                    <button className="w-full mt-2 px-3 py-1 bg-black text-white text-xs rounded-lg hover:bg-gray-800 transition-colors">
                      Open Repository
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
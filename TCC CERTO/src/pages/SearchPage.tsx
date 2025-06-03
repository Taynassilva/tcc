import React, { useState } from 'react';
import { Search, FilterX, FileText, Calendar, CheckSquare, User, MessageSquare } from 'lucide-react';

interface SearchResult {
  id: number;
  title: string;
  type: 'task' | 'document' | 'event' | 'message' | 'profile';
  description: string;
  date: string;
}

const SAMPLE_RESULTS: SearchResult[] = [
  {
    id: 1,
    title: 'Q1 Marketing Strategy',
    type: 'document',
    description: 'Document outlining the marketing approach for Q1 2025',
    date: '2 weeks ago'
  },
  {
    id: 2,
    title: 'Update client database',
    type: 'task',
    description: 'Task assigned to you by Sarah Johnson',
    date: '3 days ago'
  },
  {
    id: 3,
    title: 'Team Meeting - Product Review',
    type: 'event',
    description: 'Scheduled for March 15, 2025 at 10:00 AM',
    date: 'Tomorrow'
  },
  {
    id: 4,
    title: 'Can we discuss the project timeline?',
    type: 'message',
    description: 'Message from Michael Stevens in Marketing',
    date: '5 hours ago'
  },
  {
    id: 5,
    title: 'Sarah Johnson',
    type: 'profile',
    description: 'Design Director - Product Development',
    date: 'Active now'
  }
];

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') return;
    
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setResults(SAMPLE_RESULTS);
      setIsSearching(false);
    }, 800);
  };
  
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
  };
  
  const getResultIcon = (type: string) => {
    switch(type) {
      case 'document': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'task': return <CheckSquare className="h-5 w-5 text-green-500" />;
      case 'event': return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'message': return <MessageSquare className="h-5 w-5 text-amber-500" />;
      case 'profile': return <User className="h-5 w-5 text-red-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const filteredResults = activeFilters.length > 0
    ? results.filter(result => activeFilters.includes(result.type))
    : results;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Search</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-6">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for tasks, documents, events, people, and more..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="submit"
                  className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  disabled={isSearching}
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </form>
          
          {/* Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Filter by:</span>
            
            <button
              onClick={() => toggleFilter('document')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeFilters.includes('document')
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Documents
            </button>
            
            <button
              onClick={() => toggleFilter('task')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeFilters.includes('task')
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Tasks
            </button>
            
            <button
              onClick={() => toggleFilter('event')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeFilters.includes('event')
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Events
            </button>
            
            <button
              onClick={() => toggleFilter('message')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeFilters.includes('message')
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Messages
            </button>
            
            <button
              onClick={() => toggleFilter('profile')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeFilters.includes('profile')
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              People
            </button>
            
            {activeFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center px-2 py-1 text-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
              >
                <FilterX className="h-3 w-3 mr-1" />
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Search Results
              {activeFilters.length > 0 && (
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                  (Filtered)
                </span>
              )}
            </h2>
            
            <div className="space-y-4">
              {filteredResults.map(result => (
                <div key={result.id} className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3">
                      {getResultIcon(result.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800 dark:text-white">{result.title}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{result.date}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{result.description}</p>
                      <div className="mt-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          result.type === 'document' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : result.type === 'task'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : result.type === 'event'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            : result.type === 'message'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Empty state */}
      {results.length === 0 && searchQuery && !isSearching && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No results found</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            We couldn't find anything matching "{searchQuery}". Try using different keywords or filters.
          </p>
        </div>
      )}
      
      {/* Initial state */}
      {results.length === 0 && !searchQuery && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Search across your workspace</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Find tasks, documents, calendar events, team members, and messages all in one place.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSources } from '../features/news/newsSlice';
import Search from './Search';
import { AppDispatch, RootState } from '../store';

// Type Definitions
interface NewsItem {
  id: number;
  api_source: string;
  news_source: string;
  section: string;
  author: string;
  title: string;
  content: string;
  url: string;
  image_url: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

interface Source {
  id: number;
  identification: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
  created_at: string;
  updated_at: string;
}

interface News {
  newsItems: NewsItem[];
  sources: Source[];
}

interface NewsResponse {
  status: string;
  message: string;
  data: News;
  timestamp: string;
}

interface SourcesProps {
  news: NewsResponse | null;
}

// Custom typed hooks
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector = <T extends unknown>(selector: (state: RootState) => T) => useSelector(selector);

const Sources: React.FC<SourcesProps> = ({ news }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  
  const { loading, error } = useAppSelector((state) => state.news);

  const handleAddSource = (name: string) => {
    return () => {
      dispatch(addSources(name));
    };
  };

  if (!news?.data?.sources?.length) {
    return <p className="text-gray-600">No news sources available</p>;
  }

  const filteredSources = news.data.sources.filter((source) =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Explore Sources</h2>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {filteredSources.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white text-center rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <a
              href={item.url}
              className="text-sm text-purple-600 hover:text-purple-800 px-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
            <button
              onClick={handleAddSource(item.identification)}
              className="relative group text-xs text-purple-600 hover:text-white hover:bg-purple-800 float-right bg-purple-100 mt-5 px-3 py-1 rounded"
              disabled={loading}
            >
              <span className="block">
                {loading ? 'Adding...' : `Add ${item.name}`}
              </span>
              <span className="absolute left-1/2 bottom-full mb-2 w-max max-w-xs px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transform -translate-x-1/2 transition-opacity duration-300">
                Click to add {item.name} to your news sources
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sources;
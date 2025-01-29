import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCategories, fetchNews } from '../features/news/newsSlice';
import Search from './SearchNews';

const Headers = () => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector((state) => state.news);
  const { userInfo } = useAppSelector((state) => state.user);

  const triggerSearch = () => {
    if (debouncedSearchQuery.length >= 3) {
      dispatch(fetchNews({ categoryName, author: debouncedSearchQuery }));
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    triggerSearch();
  }, [categoryName, debouncedSearchQuery]); // Trigger search when category or debounced query changes

  // Debounce logic for search query
  useEffect(() => {
    if (searchQuery.length < 3) {
      setDebouncedSearchQuery(''); // Clear search if less than 3 characters
      return;
    }

    const debounceTimer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 2000); // 2 seconds debounce delay

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm text-gray-600"></div>
      </div>

      {!userInfo && (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div
              className="flex items-center text-sm text-gray-600 relative cursor-pointer"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              Filter by News Category
              {isCategoryDropdownOpen && (
                <div className="absolute right-2 top-5 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border">
                  {loading && (
                    <div className="px-4 py-2 text-sm text-gray-700">Loading...</div>
                  )}
                  {error && (
                    <div className="px-4 py-2 text-sm text-red-500">{error}</div>
                  )}
                  <button
                    onClick={() => setCategoryName('all')}
                    className="flex items-center w-full px-4 pt-3 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    All
                  </button>
                  {categories?.map((category, index) => (
                    <button
                      onClick={() => setCategoryName(category)}
                      key={index}
                      className="flex items-center w-full px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            triggerSearch={triggerSearch}
          />
        </div>
      )}
    </div>
  );
};

export default Headers;

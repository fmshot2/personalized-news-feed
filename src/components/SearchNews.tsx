type SearchProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    triggerSearch: () => void;
  };
  
  const Search = ({ searchQuery, setSearchQuery, triggerSearch }: SearchProps) => {
    return (
      <div className="relative">
        <input
          type="text"
          placeholder="Search news by author's name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            triggerSearch(); // Call the search function when the input changes
          }}
          className="w-64 px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <svg
          className="w-5 h-5 absolute right-3 top-2.5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    );
  };
  
  export default Search;
  
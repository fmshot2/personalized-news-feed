import dateFormatter from '../Utils/dateFormatter';


type newsObject = {
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
};


type SourcesProps = {
  news: newsObject[];
};

const News = ({ news }: SourcesProps) => {

  // Render news items
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {news?.map((item) => {
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow no-underline"
            >
              <img
                src={item.image_url || 'https://via.placeholder.com/150'}
                alt={item.news_source}
                className="w-full h-40 rounded-lg object-cover"
              />
              <div className="mt-4 w-full">
                <div className="relative group">
                  <h3 className="text-base font-medium text-gray-800 line-clamp-2 cursor-pointer">
                    {item.title}
                  </h3>
                  <div className="absolute left-1/2 bottom-full mb-2 hidden w-max max-w-xs px-3 py-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:block group-hover:opacity-100 transform -translate-x-1/2 transition-opacity duration-300">
                    {item.title}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">{item.news_source}</span>
                  <span className="text-sm text-gray-600">{dateFormatter(item.published_at)}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default News;
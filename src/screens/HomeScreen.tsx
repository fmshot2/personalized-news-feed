import { useEffect } from 'react';
import News from '../components/News';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../features/news/newsSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, news, error } = useSelector((state: any) => state.news);

  useEffect(() => {
    dispatch(fetchNews({}));
  }, [dispatch]);
  

  return (
    <div>
      {loading && <p>Loading your news preferences...</p>}
      {error && <p>Error: {error}</p>}
      {news && news.data?.newsitems?.length == 0 && <p>No news with your preferences available</p>}
      {news && <News news={news?.data?.newsItems || null} />}
    </div>
  );
};

export default HomeScreen;

import React, { useState, useEffect } from 'react';
import Sources from '../../components/Sources';
import News from '../../components/News';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../news/newsSlice';

const Preferences = () => {
  const dispatch = useDispatch();
  const { loading, news, error } = useSelector((state: any) => state.news);

  return (
    <div>

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <Sources news={news || null} />
      </main>


    </div>
  );
};

export default Preferences;

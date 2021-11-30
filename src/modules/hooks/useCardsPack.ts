import { useEffect, useState } from 'react';
import { cardsPackApi } from '../api/cardPackApi';

const initialState = {
  cardsPack: [
    {
      cardsCount: 0,
      created: '',
      grade: 0,
      more_id: '',
      name: '',
      path: '',
      private: false,
      rating: 0,
      shots: 0,
      type: '',
      updated: '',
      user_id: '',
      user_name: '',
      __v: 0,
      _id: '',
    },
  ],
  cardPacksTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
  page: 1,
  pageCount: 6,
  searchPacks: '',
  userId: '',
  packsId: '',
};

export type CardsPackType = typeof initialState;

export default function useCardsPack() {
  const [cardsPack, setCardsPack] = useState<CardsPackType>(initialState);
  const [currentPage, setCurrentPage] = useState<number>(initialState.page);
  const [pageCount, setPageCount] = useState<number>(initialState.pageCount);
  const [packName, setPackName] = useState<string>(initialState.searchPacks);
  const [min, setMin] = useState<number>(initialState.minCardsCount);
  const [max, setMax] = useState<number>(initialState.maxCardsCount);
  const [userId, setUserId] = useState<string>(initialState.userId);

  function getCardsPack(
    currentPage: number,
    pageCount: number,
    packName: string,
    userId: string,
    min: number,
    max: number
  ) {
    cardsPackApi.getCardsPack(currentPage, pageCount, packName, userId, min, max).then(res => {
      setCardsPack({
        ...cardsPack,
        cardsPack: res.data.cardPacks,
        cardPacksTotalCount: res.data.cardPacksTotalCount,
        maxCardsCount: max,
        minCardsCount: min,
        page: res.data.page,
        pageCount: res.data.pageCount,
      });
    });
  }

  useEffect(() => {
    getCardsPack(currentPage, pageCount, packName, userId, min, max);
  }, [pageCount, packName, userId, currentPage, min, max, cardsPackApi.getCardsPack]);

  function addPackTC(name: string) {
    cardsPackApi.postCardsPack(name).then(res => {});
  }

  function deletePackTC(id: string) {
    cardsPackApi.deleteCardsPack(id).then(res => {
      getCardsPack(currentPage, pageCount, packName, userId, min, max);
    });
  }

  function updatePackTC(id: string, name: string) {
    const cardsPack = {
      cardsPack: {
        _id: id,
        name: name,
      },
    };

    cardsPackApi.updateCardsPack(cardsPack).then(res => {});
  }

  function changePageCount(pageCount: number) {
    setPageCount(pageCount);
  }

  function changeCardsPage(page: number) {
    setCurrentPage(page);
  }

  function searchOnPackName(packName: string) {
    setPackName(packName);
  }

  function changeToMyCardsPack(uderId: string) {
    setUserId(uderId);
  }

  return {
    cardsPack,
    currentPage,
    pageCount,
    packName,
    min,
    max,
    userId,
    addPackTC,
    deletePackTC,
    updatePackTC,
    changePageCount,
    changeCardsPage,
    searchOnPackName,
    changeToMyCardsPack,
  };
}

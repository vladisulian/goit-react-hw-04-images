import { fetchImages } from './fetch';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryList } from './Gallery/ImageGalleryList';
import { ImageGalleryItem } from './Gallery/ImageGalleryItem';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import { Modal } from './Modal/Modal';
import { Audio } from 'react-loader-spinner';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [currentSearch, setCurrentSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageStorage, setModalImageStorage] = useState(null);
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (currentSearch) {
      setIsLoading(true);
      fetchImages(currentSearch, page)
        .then(foundData => {
          if (foundData.hits === 0) {
            console.log(foundData);
          }
          setImages(prevstate => [...prevstate, ...foundData.hits]);
          setLoadMoreButton(page < Math.ceil(foundData.total / 12));
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [page, currentSearch]);

  useEffect(() => {
    setImages([]);
    setCurrentSearch(null);
    setShowModal(false);
    setModalImageStorage(null);
    setPage(1);
  }, []);

  const onFormSubmitFetch = data => {
    setImages([]);
    setCurrentSearch(data);
    setShowModal(false);
    setModalImageStorage(null);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = modalImage => {
    // do not change priority!!!
    setShowModal(prevState => !prevState);
    setModalImageStorage(null);
    if (modalImage) {
      setModalImageStorage(modalImage);
    }
  };

  return (
    <div className="ImageGalleryFind">
      <Searchbar Submit={onFormSubmitFetch} />
      <ImageGalleryList>
        <ImageGalleryItem images={images} onClick={toggleModal} />
      </ImageGalleryList>
      {isLoading && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="orange"
          ariaLabel="loading"
          wrapperStyle
          wrapperClassName
        />
      )}
      {showModal && (
        <Modal
          onClose={toggleModal}
          modalImage={
            <img
              src={modalImageStorage.webformatURL}
              alt={modalImageStorage.tags}
            />
          }
        ></Modal>
      )}
      {loadMoreButton && <LoadMoreButton loadMore={loadMore} />}
    </div>
  );
};

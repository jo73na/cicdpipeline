import  { Fragment, useContext, useEffect, useState } from 'react';
import LoadingContext from '../Providers/Loading';

const Loader = () => {
  // const {Loading}=useContext(LoadingContext)
   const [show, setShow] = useState(true);

   useEffect(() => {
    // eslint-disable-next-line no-undef
    // const timeout = setTimeout(() => {
    //   setShow(false);
    // }, 1000); 

    // return () => {
    //   // eslint-disable-next-line no-undef
    //   clearTimeout(timeout);
    // };
  }, [show]);

  return (
    <Fragment>
      <div className={`loader-wrapper ${ show ? "":'loaderhide'}`}>
        <div className="loader">
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
          <div className="loader-bar"></div>
          <div className="loader-ball"></div>
        </div>
      </div>
    </Fragment>
  );
};
export default Loader;
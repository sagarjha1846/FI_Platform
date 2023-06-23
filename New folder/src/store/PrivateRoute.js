/* eslint-disable default-case */
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MagnifyingGlass } from 'react-loader-spinner';

export { PrivateRoute };

function PrivateRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated === undefined) {
    return (
      <div className=" w-full h-full grid place-content-center">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
        <h1 className="p-2 text-4xl">Loading...</h1>
      </div>
    ); // or loading indicator, etc...
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

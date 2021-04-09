import React from "react";
import Loader from "react-loader-spinner";

export const Spinner = (props) => {

    return (
            <div className="spinner">
                <Loader type="ThreeDots" color="#D9B48FFF" height="100" width="100"/>

                <style jsx="true">{`
                  .spinner {
                    width: 100%;
                    height: 100%;
                  }

                  .spinner {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                `}
                </style>
            </div>
    );
};

export default Spinner;
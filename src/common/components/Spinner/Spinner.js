import React from "react";
import Loader from "react-loader-spinner";

export const Spinner = () => {

    return (
            <div className="spinner">
                <Loader type="ThreeDots" color="#6bba6d" height="100" width="100"/>

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
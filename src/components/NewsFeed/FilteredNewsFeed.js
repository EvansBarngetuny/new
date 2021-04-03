import {useEffect, useState} from "react";
import Spinner from "../../common/components/Spinner/Spinner";
import GridPost from "../Post/GridPost";
import {parseDataOnSnapshot} from "../../utils/data";

const FilteredNewsfeed = ({fetchData}) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // listens for a change in the db and adds the new entries to the state each time it's fired
        parseDataOnSnapshot(fetchData, setIsLoading, setPosts);

    }, [fetchData]);


    return (
        <div className="filtered-newsfeed-container">
            {
                isLoading && <Spinner />
            }
            {
                posts.map(p => <GridPost key={p.id} postID={p.id} post={p.post}/>)
            }

            <style jsx="true">{`
              .filtered-newsfeed-container {
                display: flex;
                flex-flow: row wrap;
                align-items: end;
              }

            `}
            </style>
        </div>
    );
}

export default FilteredNewsfeed;
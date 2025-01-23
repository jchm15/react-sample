import {FC, useEffect} from "react"; 'react';

const Movies: FC = () => {

    useEffect(() => {
        console.log("렌더링 시 실행 무비")

        return () => {
            // alert("언마운트 무비")
        }
    }, [])
    
    return (
        <div>
            <h1>넷플릭스 영화 추천 목록</h1>
        </div>
    );
};

export default Movies;
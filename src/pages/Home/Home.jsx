import styl from "./Home.module.css"
import Card from "../../components/Card/Card"
import { useEffect, useRef} from "react";
import {useSelector,useDispatch } from "react-redux";
import { storeApiSelector,fetchAsyncApiData,storeActions } from "../../redux/reducers/sotreApiReducer";
export default function Home() {
    const { items,filters,data,renderData,rangeData,rangeValue } = useSelector(storeApiSelector);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchAsyncApiData());
        
    },[]);

    const refM = useRef();
    const refWM = useRef();
    const refJ = useRef();
    const refE = useRef();
    const refR = useRef();
     
    useEffect(() => {
        handleRange();
    }, [data]);




    function handleData(e, cat) {
        let d = [];
        if (e.target.checked) {
            d = items.filter(item => item.category === cat);
            if (!filters) {
                
                dispatch(storeActions.setFilters(true));
                
                dispatch(storeActions.setData(d));
            }
            else {
                dispatch(storeActions.setData([...d,...data]));
            }
        }
        else {
            if (!refM.current.checked && !refWM.current.checked && !refJ.current.checked && !refE.current.checked) {
                
                dispatch(storeActions.setFilters(false));
                dispatch(storeActions.setData(items));
            }

            else {
                d = data.filter(item => item.category != cat);
                dispatch(storeActions.setData(d));
            }
        }
    }

    function handleRange() {
        const range = refR.current.value;
        dispatch(storeActions.setRangeValue(range));
        const d = data.filter((item) => item.price <= range / 100);
        dispatch(storeActions.setRangeData(d));
        dispatch(storeActions.setRenderData(d));
    }




    function handleSearch(e) {
        if (e.target.value == "") {
            handleRange();
            return;
        }
        const d = e.target.value.toLowerCase();
        const searchData = rangeData.filter((item) => item.title.toLowerCase().includes(d));
        dispatch(storeActions.setRenderData(searchData));
    }




    return (
        <div className={styl.home}>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                <input placeholder="Search By Name" onChange={handleSearch} />
            </form>
            <aside>
                <form>
                    <h3>Filter</h3>
                    <p>Price: {rangeValue}</p>
                    <input type="range" min="" max="25000" step="5" defaultValue={25000} onChange={handleRange} ref={refR}></input>
                    <h3 style={{ marginBottom: "18px" }}>Catogery</h3>
                    <div>
                        <span><input type="checkbox" ref={refM} onChange={(e) => handleData(e, "men's clothing")} /> <label>Men's Clothing</label></span>
                        <span><input type="checkbox" ref={refWM} onChange={(e) => handleData(e, "women's clothing")} /> <label>Women's Clothing</label></span>
                        <span><input type="checkbox" ref={refJ} onChange={(e) => handleData(e, "jewelery")} /> <label>Jewelary</label></span>
                        <span><input type="checkbox" ref={refE} onChange={(e) => handleData(e, "electronics")} /> <label>Electronics</label></span>
                    </div>
                </form>
            </aside>
            <main>
                {renderData.map((item) => (
                    <Card key={item.id}item={item} />
                ))}
            </main>
        </div>
    )
}
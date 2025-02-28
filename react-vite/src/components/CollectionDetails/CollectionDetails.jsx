import {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrUserCollections } from "../../redux/collections";
import { removeCollection } from '../../redux/collections';
import { useNavigate, useParams } from "react-router-dom";
import AuxiliaryNav from "../AuxiliaryNav/AuxiliaryNav";
import FooterNav from "../FooterNav/FooterNav";
import OpenModalButton from "../OpenModalButton";
import PostLocationModal from "../LocationFormModal/PostLocationModal";
import LocationCardLite from "../ProfilePage/LocationCardLite";
import { MdAddLocation } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";


function CollectionDetails({mode, setMode}) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {collectionId} = useParams();
    const user = useSelector((state) => state.session.user);
    const collections = useSelector((state) => state.collections);
    const locations = useSelector((state) => state.locations);
    let theCollection = (Object.values(collections).filter((collection) => collection.id === parseInt(collectionId)))[0];
    let collLocations = theCollection?.locations;
    // console.log(collLocations);
    // console.log(theCollection);

    const handleEdit = () => {
        navigate(`/collections/${theCollection.id}/edit`);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this collection?")) {
            const deleteResponse = await dispatch(removeCollection(theCollection.id));
            if (deleteResponse.errors) {
                setDeleteErrors(deleteResponse.errors);
            } else {
                navigate("/profile");
            }
        }
    };

    useEffect(() => {
        if (user) {
            dispatch(fetchCurrUserCollections());
        }
    }, [dispatch, user, collLocations?.length, locations]);

    return (
        <>
        <div className="axNav">
            <AuxiliaryNav mode={mode} setMode={setMode} />
        </div>

        <div id="cdContainer" className="grid grid-cols-[1fr_2fr] justify-center w-[auto] mx-[80px] gap-[15px] h-[85vh] py-3 box-border">
            <section id="cdLeft" className="flex flex-row flex-wrap justify-center items-center w-full   min-h-[180px] md:h-[auto] lg:h-[30%] h-[20%] bg-[transparent] rounded-[10px] mb-[10px] gap-3 flex-grow">
                <div className="flex flex-row flex-wrap justify-center align-center items-center w-full bg-[#E2CFCF] rounded-[10px] py-2 gap-2 flex-grow overflow-y-auto">
                    <TiDelete
                        className="h-8 w-auto p-none m-none text-[black] shadow-[0_0px_2px_gray] flex bg-[rgb(255,255,255)]  cursor-pointer p-[4px] flex-col items-center text-center font-normal  justify-center  rounded-[7px] hover:scale-[1.1] hover:shadow-md"
                        onClick={handleDelete}
                        title="Delete Collection"
                    />
                    <div id='leftHeaderContainer' className="flex flex-col bg-[transparent]  w-auto min-w-[200px] h-8 items-center text-center font-normal justify-center px-4 py-2 rounded-[7px] border-none">
                        <h3 id="leftHeader" className="text-[#000000] w-full text-[20px] mb-[5px] text-center h-full content-center tracking-[1px] font-medium">{theCollection?.title}</h3>
                    </div>

                    <FaEdit
                        className="h-8 w-auto p-none m-none text-[black]  flex bg-[rgb(255,255,255)] shadow-[0_0px_2px_gray] cursor-pointer p-[6px] flex-col items-center text-center font-normal justify-center  rounded-[7px] hover:scale-[1.1] hover:shadow-md"
                        onClick={handleEdit}
                        title="Edit Collection"
                    />
                    <OpenModalButton
                        className="cursor-pointer h-full w-full"
                        buttonText={<MdAddLocation className="h-8 w-8 m-none text-[black]  flex bg-[rgb(255,255,255)] shadow-[0_0px_2px_gray] py-[4.5px] cursor-pointer flex-col items-center text-center font-normal justify-center  rounded-[7px] hover:scale-[1.1] hover:shadow-md"/>}
                        modalComponent={<PostLocationModal user={user} />}
                    />
                </div>
                <div className="overflow-y-auto bg-[#E2CFCF] rounded-[10px] py-4 align-center w-full min-h-[120px]">
                    <p id="mainHeader " className="text-wrap text-[black] text-[13px] align-center items-center text-left  w-full content-center tracking-[1px] px-[25px]">{theCollection?.description}</p>
                </div>
            </section>

            <section id="cdRight" className="flex flex-col h-auto  w-full justify-center mx-[2px] items-center box-border pb-2.5 rounded-[10px] bg-[rgb(227,226,226)] grow">
                <div id="locationCards" className="grow flex flex-col h-[100px] justify-start items-center overflow-y-auto w-[100%] gap-2.5 box-border px-[15px] py-7">
                    {collLocations?.map(location => (
                        <LocationCardLite key={location.id} theLocation={location}/>
                    ))}

                </div>
            </section>

        </div>
        <FooterNav/>
        </>
    )
}

export default CollectionDetails;

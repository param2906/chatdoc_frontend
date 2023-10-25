import {ColorRing} from "react-loader-spinner"

const Loader = () =>{
    return(
        <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#0056b3','#0056b3','#0056b3','#0056b3','#0056b3']}
        />
    )

}

export default Loader
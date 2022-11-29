import classes from './Home.module.scss';

import Slider from './../../components/Slider/Slider';
import Card from '../../components/Card/RecentStoreCard/RecentStoreCard';

import { useAuth } from '../../core/AuthRoleUser';

const Home = () => {
    const user = useAuth().role;
    return (
        <>
            <div className={user === "Client" ? classes["Home"] : `${classes["Home"]} ${classes["one-row"]}`}>
                {(user === "Client" || user === "") ?  
                    <>
                        <div className={ classes["Slider-Container"] }>
                            <Slider />
                        </div>

                        {user === "Client" && 
                            <div className={ classes["Card-Container"] }>
                                <Card extraclasses={["recent-stores", "StoreSpheres-container"]} type="StoreSphere" />
                            </div>
                        }                        
                    </>
                    :
                    (user === "Vendor" || user === "Admin") &&
                    <div className={ classes["Full-background"] }>
                        <div className={ classes["Logo"] }>
                            <img src="https://scontent.fsal11-1.fna.fbcdn.net/v/t39.30808-6/294170856_198771259153554_6614072344836878863_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6a0__ALeR-0AX9fowiM&_nc_ht=scontent.fsal11-1.fna&oh=00_AfCayfiwPqPc78gVpUAN_KTxTz0pTRNi7FFkYmrpSn2tgg&oe=63787F11" alt="Store Logo" />
                        </div>
                        <div className={ classes["BackGround"] }>
                            <img src="https://scontent.fsal3-1.fna.fbcdn.net/v/t1.6435-9/125273483_170405598094195_6560910777872686869_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=OcsiVJqangkAX8rwPnW&_nc_ht=scontent.fsal3-1.fna&oh=00_AfDVDk3xNK2MztPNq0mE5kHKyWVxqSXiSJfjGomcFXy58w&oe=63A46C7B" alt="Store Logo" />
                        </div>
                    </div>
                }

            </div>
        </>
    );
}

export default Home;
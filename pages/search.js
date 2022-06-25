import Header from '../components/Header'
import Footer from '../components/Footer'
import { format, compareAsc } from 'date-fns';
import { useRouter} from 'next/dist/client/router';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';

function Search({ searchResults }) {
    const router = useRouter();
//ES6 destructuring
    const { location, startDate, endDate, noOfGuests } = router.query;
//1111111111111111111111  FIX THIS 111111111111111111
    const range = `${startDate} - ${endDate}`;
    
    return (
    <div>
        <Header placeholder={`${location} | ${range} | ${noOfGuests}guests`} />
            <main className='flex'>
            <section className='flex-grow pt-14 px-6'>
                <p className='text-xs'>300+ Stays for {noOfGuests} guests</p>
                <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>
                
                <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800
                 whitespace-nowrap'>
                <p className='button'>Cancellation Flexibility</p>
                <p className='button'>Type of place</p>
                <p className='button'>Price</p>
                <p className='button'>Rooms and Beds</p>
                <p className='button'>More Filters</p>
                
                </div>

                <div className='flex flex-col'>
                {searchResults?.map(({img,location,title,description,star,price,total}) =>(
                        <InfoCard 
                        key={img}
                        img={img}
                        location={location}
                        titel={title}
                        description={description}
                        star={star}
                        price={price}
                        total={total}
                        />
                    ))}
                    </div>
                </section>
                <section className='hidden xl:inline-flex xl:min-w-[600px]'>
                    <Map searchResults={searchResults}/>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Search;
export async function getServerSideProps(context) {
    const searchResults = await fetch("https://links.papareact.com/isz").
    then(res => res.json());
    return {
        props : {
            searchResults,
        }
    }

}
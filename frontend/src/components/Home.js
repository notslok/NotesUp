// import AddNote from './AddNote';
import Notes from './Notes';

const Home = (props) => {

    return (
        <div>
            <Notes showNotif={props.showNotif}/>
        </div>
    )
}

export default Home;
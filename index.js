/*jshint esversion: 11 */
function App(){
    const [data, setData] = React.useState(null);        
    const [loaded, setLoaded] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [submit, setSubmit] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
            const response = await fetch('./books.json');
            const json     = await response.json();

            console.log('useEffect Search = ' + search);
            if (submit && search != "")
            {
                json.books = json.books.filter(book => book.title.indexOf(search) >= 0);
                console.log('search2: ', json.books);
            }
            setData(json);
            setLoaded(true);
        }
        getData();
    },[submit]);
    console.log('loaded:', loaded, 'data:', data, 'search:', search);

    const handleSubmit = e => {
        e.preventDefault();
        setSubmit(true);
    };

    return (<>
        <div className="container">
            <h1>Books for Nerds</h1>    

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <form className="d-flex" onSubmit={handleSubmit}>
                    <input id="searchText" onChange={e => setSearch(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            </nav>

            {loaded && data.books.map((book,i) => <Book data={book} key={i}/>)}
        </div>        
    </>);   
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

import './style.scss'

const Card = (contact) => {



    return (
        <div className="div-card">
            <h3 className='h3-card'>Name: <p>{contact.name}</p></h3>
            <span className="span-email">Email: <p>{contact.email}</p></span>
            <span className="span-telephone">Telephone: <p>{contact.telephone}</p></span>
            
            <button>Remove</button>
        </div>
    )
}

export default Card
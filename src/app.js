var React = require('react');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faTrashAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buyItems: ['milk', 'bread', 'fruit', 'pen'],
            message: ''
        }
    }

    addItem(e) {
        e.preventDefault();
        const { buyItems } = this.state;
        const newItem = this.newItem.value;

        const isOnTheList = buyItems.includes(newItem);

        if (isOnTheList) {
            this.setState({
                message: 'This item is already on the list.'
            })
        } else {
            newItem !== '' && this.setState({
                buyItems: [...this.state.buyItems, newItem],
                message: ''
            })
        }

        this.addForm.reset();
    }

    removeItem(item) {
        const newBuyItems = this.state.buyItems.filter(buyItem => {
            return buyItem !== item;
        })
        this.setState({
            buyItems: [...newBuyItems]
        })

        if (newBuyItems.length === 0) {
            this.setState({
                message: 'No items on your list, add some.'
            })
        }
    }
    clearAll() {
        this.setState({
            buyItems: [],
            message: 'No items on your list, add some.'
        })
    }
    render() {
        const { buyItems, message } = this.state;
        return (
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto">
                <header>
                    <p className="logo-icon text-center"><FontAwesomeIcon size="6x" color="red" icon={faShoppingBag} /></p>
                    <h1 className="text-center">Shopping List</h1>
                    <form ref={input => this.addForm = input} className="form-inline justify-content-center" onSubmit={(e) => { this.addItem(e) }}>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="newItemInput">Add New Item</label>
                            <input ref={input => this.newItem = input} type="text" placeholder="Bread" className="form-control" id="newItemInput" />
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </header>
                <div className="content">
                    {
                        (message !== '' || buyItems.length === 0) && <p className="message text-danger text-center">{message}</p>
                    }
                    {
                        buyItems.length > 0 &&
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-primary">#</th>
                                    <th className="text-primary">Item</th>
                                    <th className="text-right text-primary">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    buyItems.map(item => {
                                        return (
                                            <tr key={item}>
                                                <th scope="row" className="text-secondary">1</th>
                                                <td className="text-secondary">{item}</td>
                                                <td className="text-right">
                                                    <button onClick={(e) => this.removeItem(item)} type="button" className="btn btn-link btn-sm"><FontAwesomeIcon size="1x" color="red" icon={faTrashAlt} /></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="2">&nbsp;</td>
                                    <td className="text-right">
                                        <button onClick={(e) => this.clearAll()} className="btn btn-danger">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    }
                </div>
            </div>
        )
    }
}

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function Footer(props) {

  return (
    <footer className="footer">
      <span className="todo-count">{props.count}</span>
      <ul className="filters">
        <li>
          <Link to="/todo" className={props.filter === '' ? 'selected' : null}>All</Link>
        </li>
        <li>
          <Link to="/todo/active" className={props.filter === 'active' ? 'selected' : null}>Active</Link>
        </li>
        <li>
           <Link to="/todo/completed" className={props.filter === 'completed' ? 'selected' : null}>Completed</Link>
        </li>
      </ul>
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
}


function Header(props) {
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={(event) => {
          if (event.keyCode === 13 && event.target.value) {
            props.onCreate(event.target.value);
            event.target.value = '';
          }
        }}
      />
      <input id="toggle-all" 
      className="toggle-all" 
      type="checkbox"
      onClick={(props)=>{
        this.props.onEdit(this.props.id, { checked: event.target.checked })
      }}
       />
			<label for="toggle-all">Mark all as complete</label>
      <div className="loader" />
    </header>
  );
}

class Item extends React.Component {
  constructor(){
    super();

    this.state = {
      editable: false,
    }
  }

   renderContent() {
      if (this.state.editable){
        return(
          <input 
            defaultValue={this.props.value}
            autofocus
            onKeyDown={(event) => {
              if (event.keyCode === 13 && event.target.value) {
                this.props.this.props.onEdit(this.props.id, { value: event.target.value });
                this.setState({ editable: false })
              }
            }}
            onBlur={() => this.setState({ editable: false})}
            />
        )
      }
      return (
      <label onDoubleClick={()=> this.setState({ editable: true })}>
        {this.props.value} {String(this.state.editable)}
      </label>
      )
    }
  

  render() {
    return (
      <li data-id={this.props.id} className={this.props.checked ? 'completed' : ''}>
        <div className="view">
          <input
            className="toggle"
            checked={this.props.checked}
            type="checkbox"
            onChange={(event) => this.props.onEdit(this.props.id, { checked: event.target.checked })}
          />
          { this.renderContent()}
         <button className="destroy"
          onClick={() => this.props.onDelete(this.props.id)}></button>
        </div>
      </li>
    );
  }
}

class ToDo extends React.Component {
  constructor() {
    super();

    this.state = {
      list: [{

      }],
      filter: '',    };
    
    this.onDelete = this.onDelete.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onCreate(value) {
    this.setState({
      list: [
        ...this.state.list,
        {
          id: Date.now(),
          checked: false,
          value,
        },
      ],
    });
  }
  onDelete(id){
    this.setState({
      list: this.state.list.filter((element) => element.id !== id)
    })
  }
 
  onEdit(id, data) {
    this.setState({
      list: this.state.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...data,
          };
        }

        return item;
      }),
    });
  }
  onFilter(item) {
    if(this.state.filter === 'active'){
      return !item.checked;
    }
    if(this.state.filter === 'competed'){
      return item.checked;
    }
    return true;
  }

  render() {
    const filter = this.props.match.params.filter || '';
    return (
      <section className="todoapp">
        <Header onCreate={this.onCreate} />
         <ul className="todo-list" style={{ display: 'block' }}>  {/* <= поставить display: 'none' */}
          {
            this.state.list
            .filter((item) =>{
              if(filter === 'active'){
                return !item.checked;
              }
              if(filter === 'completed'){
                return item.checked;
              }
              return true;
            })
            .map(data => (
              <Item key={data.id} {...data} onEdit={this.onEdit} onDelete={this.onDelete}/>
            ))
          }
        </ul>
        <Footer 
        count={this.state.list.filter(item => !item.checked).length}
        filter={this.state.filter} />
      </section>
    );
  }
}

function Main(){
  return(
    <Router>
      <React.Fragment>
        <Link to="/">Main</Link>
        <br/>
        <Link to="/todo">ToDo</Link>
        <Route path="/" exact component={() => <div>Main</div>} />
        <Route path="/todo/:filter?" exact component={ToDo} />
        {/* <Route path= component={ToDo} /> */}
      </React.Fragment>
    </Router>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));





// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


// function Footer(props) {

//   return (
//     <footer className="footer">
//       <span className="todo-count">{props.count}</span>
//       <ul className="filters">
//         <li onClick={() => props.setFilter('')}>
//           <Link to="./" className={props.filter === '' ? 'selected' : null}>All</Link>
//         </li>
//         <li onClick={() => props.setFilter('active')}>
//           <Link to="./active" className={props.filter === 'active' ? 'selected' : null}>Active</Link>
//         </li>
//         <li onClick={() => props.setFilter('completed')}>
//            <Link to="./completed" className={props.filter === 'completed' ? 'selected' : null}>Completed</Link>
//         </li>
//       </ul>
//       <button className="clear-completed">Clear completed</button>
//     </footer>
//   );
// }


// function Header(props) {
//   return (
//     <header className="header">
//       <h1>todos</h1>
//       <input
//         className="new-todo"
//         placeholder="What needs to be done?"
//         autoFocus
//         onKeyDown={(event) => {
//           if (event.keyCode === 13 && event.target.value) {
//             props.onCreate(event.target.value);
//             event.target.value = '';
//           }
//         }}
//       />
//       <input id="toggle-all" 
//       className="toggle-all" 
//       type="checkbox"
//       onClick={(props)=>{
//         this.props.onEdit(this.props.id, { checked: event.target.checked })
//       }}
//        />
// 			<label for="toggle-all">Mark all as complete</label>
//       <div className="loader" />
//     </header>
//   );
// }

// class Item extends React.Component {
//   constructor(){
//     super();

//     this.state = {
//       editable: false,
//     }
//   }

//    renderContent() {
//       if (this.state.editable){
//         return(
//           <input 
//             defaultValue={this.props.value}
//             autofocus
//             onKeyDown={(event) => {
//               if (event.keyCode === 13 && event.target.value) {
//                 this.props.this.props.onEdit(this.props.id, { value: event.target.value });
//                 this.setState({ editable: false })
//               }
//             }}
//             onBlur={() => this.setState({ editable: false})}
//             />
//         )
//       }
//       return (
//       <label onDoubleClick={()=> this.setState({ editable: true })}>
//         {this.props.value} {String(this.state.editable)}
//       </label>
//       )
//     }
  

//   render() {
//     return (
//       <li data-id={this.props.id} className={this.props.checked ? 'completed' : ''}>
//         <div className="view">
//           <input
//             className="toggle"
//             checked={this.props.checked}
//             type="checkbox"
//             onChange={(event) => this.props.onEdit(this.props.id, { checked: event.target.checked })}
//           />
//           { this.renderContent()}
//          <button className="destroy"
//           onClick={() => this.props.onDelete(this.props.id)}></button>
//         </div>
//       </li>
//     );
//   }
// }

// class ToDo extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       list: [{

//       }],
//       filter: '',    };
    
//     this.setFilter = this.setFilter.bind(this);
//     this.onDelete = this.onDelete.bind(this);
//     this.onCreate = this.onCreate.bind(this);
//     this.onEdit = this.onEdit.bind(this);
//   }

//   onCreate(value) {
//     this.setState({
//       list: [
//         ...this.state.list,
//         {
//           id: Date.now(),
//           checked: false,
//           value,
//         },
//       ],
//     });
//   }
//   onDelete(id){
//     this.setState({
//       list: this.state.list.filter((element) => element.id !== id)
//     })
//   }
//   setFilter(filter){
//     this.setState({
//       filter,
//     });
//   }

//   onEdit(id, data) {
//     this.setState({
//       list: this.state.list.map((item) => {
//         if (item.id === id) {
//           return {
//             ...item,
//             ...data,
//           };
//         }

//         return item;
//       }),
//     });
//   }
//   onFilter(item) {
//     if(this.state.filter === 'active'){
//       return !item.checked;
//     }
//     if(this.state.filter === 'competed'){
//       return item.checked;
//     }
//     return true;
//   }

//   render() {
//     const filter = this.props.match.params.filter || '';
//     return (
//       <section className="todoapp">
//         <Header onCreate={this.onCreate} />
//          <ul className="todo-list" style={{ display: 'block' }}>  {/* <= поставить display: 'none' */}
//           {
//             this.state.list
//             .filter((item) =>{
//               if(filter === 'active'){
//                 return !item.checked;
//               }
//               if(filter === 'completed'){
//                 return item.checked;
//               }
//               return true;
//             })
//             .map(data => (
//               <Item key={data.id} {...data} onEdit={this.onEdit} onDelete={this.onDelete}/>
//             ))
//           }
//         </ul>
//         <Footer 
//         count={this.state.list.filter(item => !item.checked).length}
//         setFilter={this.setFilter} 
//         filter={this.state.filter} />
//       </section>
//     );
//   }
// }

// function Main(){
//   return(
//     <Router>
//       <React.Fragment>
//         <Link to="/">Main</Link>
//         <br/>
//         <Link to="/todo">ToDo</Link>
//         <Route path="/" exact component={() => <div>Main</div>} />
//         <Route path="/todo" exact component={ToDo} />
//         <Route path="/todo/:filter" component={ToDo} />
//       </React.Fragment>
//     </Router>
//   )
// }

// ReactDOM.render(<Main />, document.getElementById('root'));

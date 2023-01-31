import { Component } from 'react';
import Notiflix from 'notiflix';

export class Searchbar extends Component {
  state = {
    searchbar: '',
  };

  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  onSubmit = e => {
    e.preventDefault();

    {
      this.state.searchbar !== ''
        ? this.props.onSubmit(this.state.searchbar)
        : Notiflix.Notify.warning('Please, enter text');
    }
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            name="searchbar"
            value={this.state.searchbar}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

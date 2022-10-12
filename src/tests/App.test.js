import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';

test('I am your test', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello, App!/i);
  expect(linkElement).toBeInTheDocument();
});

describe('test the components', () => {
  const arrayName = ['Tatooine', 'Alderaan', 'Yavin IV', 'Hoth', 'Dagobah', 'Bespin', 'Endor', 'Naboo', 'Coruscant', 'Kamino']
  const options = ['population', 'orbital_period','diameter', 'rotation_period', 'surface_water'];

  beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(testData),
      });
      render(<App />);
    });
  it('testa se os planetas e options aparecem após a chamada da API', async () => {
    const title = screen.getByText(/Star Wars Planets/i);
    expect(title).toBeInTheDocument();
    const optionsCol = screen.getByTestId('column-filter');
    expect(optionsCol).toBeInTheDocument();

    arrayName.forEach((el)=> {
      const element = screen.getByText(el);
      expect(element).toBeInTheDocument();
    });

    options.forEach((option)=> {
      const optionElem = screen.getAllByText(option);
      expect(optionElem[1]).toBeTruthy();
    });
  });

  it('testa se os filtro por nome com oo funciona', async () => {
    await waitFor(()=> {
      const rows = screen.getByTestId('tbody-element');
      expect(rows.children.length).toBe(10);
    });
    const inputText = screen.getByTestId('name-filter');
    userEvent.type(inputText, 'oo');
    const rows = screen.getByTestId('tbody-element');
    expect(rows.children.length).toBe(2);
  });

  it('testa se o filtro numerico funciona', async () => {
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');

    await waitFor(() => {
      expect(columnFilter.value).toBe('population');
      expect(comparisonFilter.value).toBe('maior que');
      expect(valueFilter.value).toBe('0');
    });

    const btnFilter = screen.getByTestId('button-filter');
    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter,'menor que');
    userEvent.type(valueFilter, '10000');
    userEvent.click(btnFilter);
    const linhas = screen.getByTestId('tbody-element');
    expect(linhas.children.length).toBe(3);
  });

  it('testa as tres opções do filtro númerico', async () => {
    await waitFor(() => {});
      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      const valueFilter = screen.getByTestId('value-filter');
      const btnFilter = screen.getByTestId('button-filter');

      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.type(valueFilter, '2000000000');
      userEvent.click(btnFilter);
      const linhas = screen.getByTestId('tbody-element');

      expect(linhas.children.length).toBe(5);

      userEvent.selectOptions(columnFilter, 'surface_water');
      userEvent.selectOptions(comparisonFilter, 'maior que');
      userEvent.type(valueFilter, '100');
      userEvent.click(btnFilter);

      expect(linhas.children.length).toBe(0);

      const removeFilters = screen.getByTestId('button-remove-filters');
      userEvent.click(removeFilters);

      expect(linhas.children.length).toBe(10);

      userEvent.selectOptions(columnFilter, 'diameter');
      userEvent.selectOptions(comparisonFilter, 'igual a');
      userEvent.type(valueFilter, '1234');
      userEvent.click(btnFilter);

      expect(linhas.children.length).toBe(0);

      const deleteSingleFilter = screen.getByRole('button', { name: 'DELETE'})

      expect(deleteSingleFilter).toBeInTheDocument();

      userEvent.click(deleteSingleFilter);

      expect(linhas.children.length).toBe(10);

  });
})

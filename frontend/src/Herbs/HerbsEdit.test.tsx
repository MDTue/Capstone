
import {getByTestId, render, screen} from "@testing-library/react";
import HerbsEdit from "./HerbsEdit";
import {BrowserRouter} from "react-router-dom";

beforeEach(()=> localStorage.setItem("token", "123"))
afterEach(()=> localStorage.clear())

test('that component is rendered', () => {

    const editItem = {
        herbsName: 'Zistrose',
        herbsDescription: 'liebt die Sonne',
        herbsApplication: 'Tee',
        herbsNameCategory: 'Heilkraut',
        herbsApplicationCategory: 'Tee',
        herbsDescriptionCategory: 'sonnige Standorte',

        herbsPicUrl1: '',
        herbsPicUrl2: '',
        links: []
    }
    const testChangeFunction = () => {    };
    render(<BrowserRouter> <HerbsEdit herbToChange={editItem} onHerbsCreation={testChangeFunction}/> </BrowserRouter>);
    expect(screen.getByTestId('herbName').getAttribute('value')).toEqual('Zistrose')
})


test('that component is deleted', (done) => {
    const editItem =  [{
        herbsName: 'Zistrose',
        herbsDescription: 'liebt die Sonne',
        herbsApplication: 'Tee',
        herbsNameCategory: 'Heilkraut',
        herbsApplicationCategory: 'Tee',
        herbsDescriptionCategory: 'sonnige Standorte',

        herbsPicUrl1: '',
        herbsPicUrl2: '',
        links: []
    }, {
        herbsName: 'Pfefferminze',
        herbsDescription: 'liebt die Sonne',
        herbsApplication: 'Tee',
        herbsNameCategory: 'Heilkraut',
        herbsApplicationCategory: 'Tee',
        herbsDescriptionCategory: 'sonnige Standorte',

        herbsPicUrl1: '',
        herbsPicUrl2: '',
        links: []
    }, {
        herbsName: 'Salbei',
        herbsDescription : 'liebt die Sonne',
        herbsApplication : 'Tee',
        herbsNameCategory : 'Heilkraut',
        herbsApplicationCategory : 'Tee',
        herbsDescriptionCategory : 'sonnige Standorte',

        herbsPicUrl1 : '',
        herbsPicUrl2: '',
        links : []
    }]
    jest.spyOn(window, 'fetch').mockImplementation(() => {
        return Promise.resolve({
            status: 200,
            json: () => Promise.resolve({
                info: {},
                results: editItem
            })
        } as Response)
    });
    const testDeleteFunction = () => {
        done();
    };
    render( <BrowserRouter> <HerbsEdit herbToChange ={editItem[0]} onHerbsCreation={testDeleteFunction} /> </BrowserRouter>);

   

    screen.getByTestId('delete-button').click();
});
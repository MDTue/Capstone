
import {getByTestId, render, screen} from "@testing-library/react";
import HerbsEdit from "./HerbsEdit";
import {BrowserRouter} from "react-router-dom";
import {getValue} from "@testing-library/user-event/dist/utils";


test('that component is rendered', () => {

    const editItem = {
        herbsName: 'Zistrose',
        herbsDescription: 'liebt die Sonne',
        herbsApplication: 'Tee',
        herbsNameCategory: 'Heilkraut',
        herbsApplicationCategory: 'Tee',
        herbsDescriptionCategory: 'sonnige Standorte',
        herbsOk: true,
        herbsPicUrl1: '',
        links: []
    }
    const testChangeFunction = () => {    };
    render(<BrowserRouter> <HerbsEdit herbToChange={editItem} onHerbsCreation={testChangeFunction}/> </BrowserRouter>);
    expect(screen.getByTestId('herbName').getAttribute('value')).toEqual('Zistrose')
})


test('that component is deleted', (done) => {
    jest.spyOn(window, 'fetch').mockImplementation(() => {
        return Promise.resolve({} as Response)
    });
    const editItem = {
        herbsName: 'Zistrose',
        herbsDescription : 'liebt die Sonne',
        herbsApplication : 'Tee',
        herbsNameCategory : 'Heilkraut',
        herbsApplicationCategory : 'Tee',
        herbsDescriptionCategory : 'sonnige Standorte',
        herbsOk : true,
        herbsPicUrl1 : '',
        links : []
    }

    const testDeleteFunction = () => {
        done();
    };
    render( <BrowserRouter> <HerbsEdit herbToChange ={editItem} onHerbsCreation={testDeleteFunction} /></BrowserRouter>);

    screen.getByTestId('delete-button').click();
});
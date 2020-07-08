import React, { useState, useEffect } from 'react';
import { IonGrid, IonRow, IonCol, IonIcon, IonCard, IonCardHeader, IonCardSubtitle, IonItem, IonLoading, IonRadioGroup, IonRadio } from '@ionic/react';
import axios from 'axios';
import { cloudyNightOutline, earthOutline, heartOutline, nutritionOutline, fastFoodOutline, trophyOutline } from 'ionicons/icons';
import './recommendedFilter.css';
import SubFiltersComponent from '../SubFilters/SubFilters.component';

export interface Tags {
    type: string;
    name: string;
    display_name: string;
    id: number;
}

const buttonsFilter = [
    {val: 'dietary', icon: nutritionOutline},
    {val: 'occasion', icon: heartOutline},
    {val: 'difficulty', icon: trophyOutline},
    {val: 'seasonal', icon: cloudyNightOutline},
    {val: 'meal', icon: fastFoodOutline},
    {val: 'cuisine', icon: earthOutline}
]

const RecommendedFiltersComponent: React.SFC = () => {
    const [dataResults, setDataResults] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [subFilters, setSubFilters] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState<string>('');

    useEffect(() => {
        axios({
            "method":"GET",
            "url":"https://tasty.p.rapidapi.com/tags/list",
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"tasty.p.rapidapi.com",
                "x-rapidapi-key":"78d63c1373msh8833585cf039d7cp1a877djsn5d2601f5d3b7",
                "useQueryString":true
            }
        }).then((response) => {
            return setDataResults(response.data.results);
        }).catch((error)=> {console.log(error)})
        .finally(() => {setShowLoading(false)})
    }, [setDataResults]);

    const getFilterResults = (valItem: string) => {
        const arrSubFilters: any[] = [];
        // checked results
        setSelectedValue(valItem);
        // subfilters results
        dataResults.map((subfilters: Tags) => {
            if (valItem === subfilters.type) {
                arrSubFilters.push(subfilters.name);
            }
            return arrSubFilters;
        });
        return setSubFilters(arrSubFilters);
    }

    return ( 
        <IonGrid>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={5000}
            />
            <IonRadioGroup onIonChange={e => getFilterResults(e.detail.value)} allowEmptySelection={true}>
                <IonRow className="ion-padding">
                {buttonsFilter.map((item: {val: string, icon: string}, index: number) => {
                    return  <IonCol size="6" key={index} className="ion-text-center">
                                <IonCard className={`${selectedValue === item.val ? 'selected__card' : ''} ion-no-margin`}>
                                    <IonCardHeader>
                                        <IonItem lines="none" className="recommended__select">
                                            <IonRadio value={item.val} slot="end" />
                                        </IonItem>
                                            <IonIcon size="small" icon={item.icon} />
                                            <IonCardSubtitle>{item.val}</IonCardSubtitle>
                                    </IonCardHeader>
                                </IonCard>  
                            </IonCol>             
                })}
                </IonRow>
            </IonRadioGroup>
            {selectedValue.length > 0 && <SubFiltersComponent subFilters={subFilters} selectValue={selectedValue} />}
        </IonGrid>
     );
}
 
export default RecommendedFiltersComponent;

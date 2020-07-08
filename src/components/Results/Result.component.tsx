import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { IonLoading, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid } from '@ionic/react';

export interface ResultsViewComponentProps {
    resultsSearch?: object;
    tagsFilter?: string[];
}

export interface Recipe {
    name: string,
    num_serve: number,
    thumbnail_url: string,
    country: string
}
 
const ResultsViewComponent: React.SFC<ResultsViewComponentProps> = ({resultsSearch, tagsFilter}) => {
    // const [showLoading, setShowLoading] = useState(false);
    const [resultFilters, setResultFilters] = useState<any[]>([]);

    useEffect(() => {
        Axios({
            "method":"GET",
            "url":"https://tasty.p.rapidapi.com/recipes/list",
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"tasty.p.rapidapi.com",
                "x-rapidapi-key":"78d63c1373msh8833585cf039d7cp1a877djsn5d2601f5d3b7",
                "useQueryString":true
            },"params":{
                "tags": tagsFilter,
                "from":"0",
                "sizes":"20"
            }
        }).then((response) => {
            // setShowLoading(true);
            return setResultFilters(response.data.results);
        }).catch((error) => {console.log(error)
        })
        // .finally(() => {setShowLoading(false)})
    },[setResultFilters, tagsFilter]);

    return (
        <IonGrid>
            {/* <IonLoading
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={5000}
            /> */}

            {resultFilters.map((recipe: Recipe, index: number) => {
                return  <IonCard key={index}>
                            <img src={recipe.thumbnail_url} alt={recipe.name} />
                            <IonCardHeader>
                                <IonCardTitle>{recipe.name}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>

                            </IonCardContent>
                        </IonCard>
            })}
        </IonGrid>
    );
}
 
export default ResultsViewComponent;

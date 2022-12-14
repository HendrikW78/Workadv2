/// <reference types="@workadventure/iframe-api-typings" />
// Namespace

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup",time + " Uhr",[]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopup)


    WA.room.area.onEnter('Wald1').subscribe(() => {
        currentPopup = WA.ui.openPopup("Waldtext","Baum",[]);
    })

    WA.room.area.onLeave('Wald1').subscribe(closePopup)

    WA.room.area.onEnter('Wald2').subscribe(() => {
        currentPopup = WA.ui.openPopup("Waldtext","hier ruht Ruth",[]);
    })

    WA.room.area.onLeave('Wald2').subscribe(closePopup)

    WA.room.area.onEnter('KrautExit').subscribe(() => {
        currentPopup = WA.ui.openPopup("KrautPop","Ausgang zur Krautworld",[]);
    })

    WA.room.area.onLeave('KrautExit').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};

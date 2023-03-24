import {createStore} from 'vuex';
import axiosClient from '../axios';

const tmpSurveys = [
    {
        id:100,
        title:"Tahses ICT Solution",
        slug:"Tahses",
        status: "draft",
        image: "",
        description: "I'm working @ Tahses Enim cupidatat sunt sint non enim mollit reprehenderit eu occaecat voluptate ea labore est eiusmod. Cillum id irure Lorem commodo et minim tempor Lorem elit magna consectetur anim. Consequat veniam est ex duis voluptate Lorem. Fugiat culpa qui duis et. Non cupidatat et commodo nisi nostrud aute.",
        created_at:"",
        updated_at:"",
        expire_date:"",
        questions:[
            {
                id:1,
                type: 'select',
                question:"What work did we do for you?",
                description : null,
                data: {
                    opttions:[
                        {
                            uuid:'a1c9adb1-8710-4acf-a80f-4dc64e07bac9',
                            text:"software development",
                        },{
                            uuid:'c5509163-7493-4ae2-9e64-6d9de951cb61',
                            text:"consulatancy",
                        },{
                            uuid:'5618e27c-c40c-4bef-9a9c-e299dbfb48bd',
                            text:"system instalation",
                        },{
                            uuid:'c5022a45-2a28-4c5b-af90-0fe57a91305b',
                            text:"website",
                        },
                    ]
                }
            },{
                id:2,
                type: 'radio',
                question:"When was it?",
                description : "Consectetur consequat labore incididunt do ipsum occaecat proident anim Lorem culpa elit dolore nostrud veniam. Occaecat pariatur ea mollit reprehenderit laboris. Laboris aliquip adipisicing duis non. Nisi consectetur sunt laboris amet Lorem consequat esse commodo id eiusmod ipsum anim. Consectetur eiusmod excepteur proident eu. Sunt laborum anim excepteur ex quis quis non nulla.",
                data: {
                    options:[
                        {
                            uuid:'794bfb98-2a27-44f1-ab1f-d12659d19530',
                            text:"under 3 months",
                        },{
                            uuid:'fc37dd74-3ed9-4318-a29f-839311923c11',
                            text:"3 to 6 month",
                        },{
                            uuid:'902c4cf9-0470-4c31-93cd-9ade6dc02a33',
                            text:"6 month to a year",
                        },{
                            uuid:'f26d6871-40ee-45fa-af42-425b7df693db',
                            text:"more than a year",
                        },
                    ]  
                }
            },{
                id:3,
                type: 'checkbox',
                question:"how log did we work together?",
                description : "Commodo fugiat fugiat aliquip reprehenderit magna nulla proident veniam consequat excepteur. Ad est et id culpa reprehenderit ea eu Lorem et in. Velit sint mollit aliquip quis sit non. Nostrud amet Lorem dolore cupidatat est ut eu sit laborum duis laborum.",
                data: {
                    options:[
                        {
                            uuid:'0ad84319-21df-47eb-8689-6d3f4fccf78d',
                            text:"under 3 months",
                        },{
                            uuid:'0560097e-d4e5-47bd-ba8f-6c40e7ba05de',
                            text:"3 to 6 month",
                        },{
                            uuid:'0ab7d606-29e6-4d5b-bbe2-84c55d2a7765',
                            text:"6 month to a year",
                        },{
                            uuid:'8c5f4a19-f83b-4b86-b4f7-1833dd3fe307',
                            text:"more than a year",
                        },
                    ]
                }
            },{
                id:4,
                type: 'textarea',
                question:"if you have a comment",
                data: {}
            },
        ],
    },{
        id:200,
        title:"Second",
        slug:"Tahses",
        status: "draft",
        image: "",
        description: "second question Duis cillum exercitation sunt qui aliqua. Sit veniam esse aliquip ipsum nisi occaecat enim. Consequat consequat id sit aliquip minim incididunt.",
        created_at:"",
        updated_at:"",
        expire_date:"",
        questions:[],
    },{
        id:300,
        title:"Third",
        slug:"Tahses",
        status: "draft",
        image: "",
        description: "third question Duis cillum exercitation sunt qui aliqua. Sit veniam esse aliquip ipsum nisi occaecat enim. Consequat consequat id sit aliquip minim incididunt.",
        created_at:"",
        updated_at:"",
        expire_date:"",
        questions:[],
    },
]
const store = createStore({
    state(){
        return{
        user:{
            data:{},
            token:''
        },
        surveys:[...tmpSurveys],
        questionTypes:['text','select','radio','checkbox','textarea']
    }
    },

    // getters:{},
    actions:{
        saveSurvey({commit},survey){

        delete survey.image_url;
        
        let response;
        //updating survey
        if(survey.id){
            
            response = axiosClient
            .put(`/survey/${survey.id}`,survey)
            .then((res)=>{
                store.commit("updateSurvey",res.data)
                console.log(res);
                return res;
            })

        }else{
            //adding a new survey
            response = axiosClient
            .post("/survey",survey)
            .then((res)=>{
                store.commit("saveSurvey",res.data);
                console.log(res);
                return res;
            })
        }
        return response;
    },
        register({commit},user) {
            return axiosClient.post('/register', user)
            .then(({data})=>{
                store.commit('setUser',data);
                return data;
            })
        },
        login({commit},user) {
            return axiosClient.post('/login', user)
            .then(({data})=>{
                store.commit('setUser',data);
                return data;
            })
        },
        logout({commit}) {
            return axiosClient.get('/logout')
            .then((res)=>{
                store.commit('logout');
                console.log(res);
                return res;
            })
        },
    },
     mutations:{
        saveSurvey:(state,survey)=>{
            state.surveys=[...state.surveys,survey.data];
            console.log('saving');
        },
        updateSurvey:(state,survey)=>{
            state.surveys=state.surveys.map((s)=>{
                if(s.id==survey.data.id){
                    return survey.data;
                }
                return s;
            });
        },
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },
        setUser:(state, res)=>{
            console.log(res);
            state.user.token = res.token;
            state.user.data = res.user;
            sessionStorage.setItem('TOKEN',res.token);
        }
     },
    //modules:{}

})
export default store;
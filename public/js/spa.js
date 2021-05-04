const app = new Vue({
    'el': '#app',
    data:{
        messages:[
            'Soluciones geodésicas e innovacion topogŕafica y arquitectura.',
            'Atendemos a toda la republica mexicana.',
            'Brigadas topograficas.',
        ],
        page: 'main',
        description: '',
        count_letter: 0,
        count_message: 0,
        state_normal: true,
        intervals : 100,
        loading: false,
        change_color: true,
        change_page: false,
        url: null,
        urlParams: null,
        load_text:"",
        count_loading:0,
        text_asset_loading:"Cargando"
    },
    mounted(){
        this.setDescription();

        this.url = new URL(window.location.href);
        this.urlParams = this.url.searchParams;
        let myParam = this.urlParams.get('page');

        if(myParam == null){
            myParam = 'main';
        }
        this.showLoadPage(myParam);   

        window.setTimeout(()=>{this.loading=true},3000);
    },
    computed(){

    },
    methods:{
        setDescription:function(){
            if(this.count_message >= this.messages.length){
                this.count_message = 0;
            }
            let myinterval =  window.setInterval(()=>{
                if(this.messages[this.count_message][this.count_letter] != null && this.state_normal == true){
                    this.description += this.messages[this.count_message][this.count_letter];
                    this.count_letter += 1;
                }
                else if(this.messages[this.count_message][this.count_letter] == null && this.state_normal == true){
                    this.state_normal = false;
                    window.clearInterval(myinterval);
                    setTimeout(this.setDescription,2000);
                }
                if(this.count_letter != -1 && this.state_normal == false){
                    let arr_message = this.description.split("");
                    arr_message[this.count_letter] = "";
                    this.description = arr_message.join("");
                    this.count_letter -= 1;
                }
                else if(this.count_letter <= -1 && this.state_normal == false){
                    this.state_normal = true;
                    this.message = "";
                    this.count_letter = 0;
                    this.count_message += 1;
                    window.clearInterval(myinterval);
                    setTimeout(this.setDescription,2000);
                }
            },this.intervals);
            if( this.state_normal == true){
                this.change_color = !this.change_color;
            }
        },
        showLoadPage:function(page){
            this.change_page =true;
            this.showLoadingText();
            setTimeout(()=>{
                this.changePage(page);
            },2000);
        },
        changePage: function(page){
            this.page = page;
            this.change_page =false;
            this.urlParams.set('page',this.page);
            this.url.search = this.urlParams.toString();
            window.history.pushState("page","page "+ page,this.url);
        },
        showLoadingText(){
            let myinterval2 =  window.setInterval(()=>{
                if(this.text_asset_loading[this.count_loading] != null){
                    this.load_text += this.text_asset_loading[this.count_loading];
                    this.count_loading += 1;
                }
                else{
                    this.load_text ="";
                    this.count_loading = 0;
                    window.clearInterval(myinterval2);
                }
            },230);

        }

    }
});
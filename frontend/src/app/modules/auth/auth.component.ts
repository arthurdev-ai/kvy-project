import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
type AuthentificationItemsType = {
  id: string;
  title: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <section
      class="flex w-full  px-2 bg-stone-200 relative items-center justify-center min-h-screen"
    >
      <div
        class="bg-white min-h-[430px] rounded-2xl flex relative overflow-hidden items-center z-10 flex-column h-full shadow-xl w-full max-w-5xl container"
      >
        <div class="w-full">
          <div class="grid sm:grid-cols-2   grid-cols-1 ">
            <div class="col-span-1 p-8">
              @if(currentAuthentificationItem != null ||
              currentAuthentificationItem != undefined){
              <h2
                class="sm:text-3xl text-blue-500 text-left text-2xl font-bold"
              >
                {{ currentAuthentificationItem.title }}
              </h2>

              }
              <div>
                <router-outlet (activate)="onActivate($event)" />
              </div>
            </div>
            <div
              style="box-shadow: -9px 1px 17px #00000033;"
              class="sm:block hidden col-span-1 rounded-s-full min-h-[430px] bg-cyan-500 bg-gradient-to-br from-blue-700"
            ></div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AuthComponent {
  title = 'Authentification';

  private authentificationItemsType: AuthentificationItemsType[] = [
    {
      id: 'Connexion',
      title: 'Se connecter',
    },
    {
      id: 'ForgotPassword',
      title: 'Mot de passe oublié',
    },
    {
      id: 'Inscription',
      title: "S'inscrire",
    },
  ];

  public currentAuthentificationItem: AuthentificationItemsType = {
    id: '',
    title: '',

  };

  onActivate(event: any) {
    console.log(this.authentificationItemsType, event.title)
    const element = this.authentificationItemsType.filter(
      (item) => item.id == event.title
    )[0];
    if (element) this.currentAuthentificationItem = element;
  }
}

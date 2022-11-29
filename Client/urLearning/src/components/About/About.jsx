import kpo from "../../components/img/kpo.jpg";
import kpo1 from "../../components/img/kpo1.jpg"
import kpo2 from "../../components/img/kpo2.jpg";
import styles from "./About.module.css"
import { GoMarkGithub } from "react-icons/go"
import { Link } from "react-router-dom";

export default function About() {
    return (
        <section className={styles.headercontainer}>
            <div className={styles.sideleft}>
                <h1 className={styles.up}>Conoce a nuestro Staff</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident inventore magni doloribus distinctio expedita natus exercitationem rerum libero. Nostrum veritatis eos error asperiores a deserunt sunt architecto voluptatem fugiat et.</p>
            </div>
            <div className={styles.sideright}>
                <img src={kpo} alt="girl" />

            </div>

            <img className={styles.imagen} src={kpo1} alt="girl" />
            <div class="grid mb-8 mt-5  border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">"El éxito es, en gran medida, una combinación de suerte y trabajo duro"</h3>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://ca.slack-edge.com/TPRS7H4PN-U03M451CT28-d4b8b7986158-512" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Juan Santillan</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Fullstack Developer</div>
                            <a href="https://github.com/JuanSBass" class="my-4 font-light"><GoMarkGithub /> JuanSBass </a>
                            <br />
                        </div>
                    </figcaption>
                </figure>
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-tr-lg dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">"Lo lindo del trabajo en equipo es que siempre tienes alguien a tu lado"</h3>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://ca.slack-edge.com/TPRS7H4PN-U03P3C633MX-0174f29c77aa-512" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Lourdes López Pepa</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Fullstack Developer</div>
                            <a href="https://github.com/lupilp" class="my-4 font-light"><GoMarkGithub /> lupilp </a>
                            <br />
                        </div>
                    </figcaption>
                </figure>
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-bl-lg md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">"No importa de dónde vienes. Solo importa hacia dónde vas"</h3>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdtlvOpR2_P3QDBc5AzSvAqkyT--BCy9bAXg&usqp=CAU" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Santiago Restrepo</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Fullstack Developer</div>
                            <a href="https://github.com/poppersaurio" class="my-4 font-light"><GoMarkGithub /> poppersaurio </a>
                            <br />
                        </div>
                    </figcaption>
                </figure>
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-br-lg dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">"Todo comienza con una idea excelente y con trabajo en equipo"</h3>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://ca.slack-edge.com/TPRS7H4PN-U037L7BPE7P-663ce2540388-512" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Gaston Alejandro Resoagli</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Fullstack Developer</div>
                            <a href="https://github.com/GastonResoagli" class="my-4 font-light"><GoMarkGithub /> GastonResoagli </a>
                            <br />
                        </div>
                    </figcaption>
                </figure>
            </div>
            <div class="grid mb-8 mt-5 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">"El único camino es seguir adelante"</h3>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://ca.slack-edge.com/TPRS7H4PN-U03F6EBERJ7-e30166cca133-512" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Lucas Canaparo</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Fullstack Developer</div>
                            <a href="https://github.com/LucasCanaparo" class="my-4 font-light"><GoMarkGithub /> LucasCanaparo </a>
                            <br />
                        </div>
                    </figcaption>
                </figure>
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-tr-lg dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">"El trabajo en equipo es el secreto para que la gente común logre resultados extraordinarios"</h3>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://ca.slack-edge.com/TPRS7H4PN-U03A1BJL7A8-53bf8ad6c6d1-512" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Valen Lara</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Fullstack Developer</div>
                            <a href="https://github.com/Valen-Lara" class="my-4 font-light"><GoMarkGithub /> Valen-Lara </a>
                            <br />
                        </div>
                    </figcaption>
                </figure>
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-bl-lg md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">"La clave para un liderazgo exitoso hoy en día es tener influencia, no autoridad"</h3>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://ca.slack-edge.com/TPRS7H4PN-U03ABGV3Y1F-13ec6a079d02-512" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Marco Giabbani</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Fullstack Developer</div>
                            <a href="https://github.com/marcogiabbani" class="my-4 font-light"><GoMarkGithub /> marcogiabbani </a>
                            <br />
                        </div>
                    </figcaption>
                </figure>
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-br-lg dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">"Con un equipo entusiasta puedes lograr casi cualquier cosa que te propongas"</h3>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://ca.slack-edge.com/TPRS7H4PN-U02J4GBKUKV-f13ce9c07f58-512" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>César Restrepo</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Fullstack Developer</div>
                            <a href="https://github.com/carc0813" class="my-4 font-light"><GoMarkGithub /> carc0813 </a>
                            <br />
                        </div>
                    </figcaption>
                </figure>
            </div>
            <img className={styles.imagen2} src={kpo2} alt="girl" />
        </section>
    )
}
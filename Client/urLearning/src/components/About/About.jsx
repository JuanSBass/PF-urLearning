import kpo from "../../components/img/kpo.jpg";
import styles from "./About.module.css"

export default function About() {
    return (
        <section className={styles.headercontainer}>
            <div className={styles.sideleft}>
                <h1 className={styles.up}>La mejor forma de aprender y enseñar</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident inventore magni doloribus distinctio expedita natus exercitationem rerum libero. Nostrum veritatis eos error asperiores a deserunt sunt architecto voluptatem fugiat et.</p>
            </div>
            <div className={styles.sideright}>
                <img src={kpo} alt="girl" />

            </div>

            <img className={styles.imagen} src={kpo} alt="girl" />
            <div class="grid mb-8 mt-5  border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Very easy this was to integrate</h3>
                        <p class="my-4 font-light">If you care for your time, I hands down would go with this."</p>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Bonnie Green</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Developer at Open AI</div>
                        </div>
                    </figcaption>
                </figure>
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-tr-lg dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Solid foundation for any project</h3>
                        <p class="my-4 font-light">Designing with Figma components that can be easily translated to the utility classes of Tailwind CSS is a huge timesaver!"</p>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Roberta Casas</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Lead designer at Dropbox</div>
                        </div>
                    </figcaption>
                </figure>
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-bl-lg md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Mindblowing workflow</h3>
                        <p class="my-4 font-light">Aesthetically, the well designed components are beautiful and will undoubtedly level up your next application."</p>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Jese Leos</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Software Engineer at Facebook</div>
                        </div>
                    </figcaption>
                </figure>
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-br-lg dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Efficient Collaborating</h3>
                        <p class="my-4 font-light">You have many examples that can be used to create a fast prototype for your team."</p>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Joseph McFall</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">CTO at Google</div>
                        </div>
                    </figcaption>
                </figure>
            </div>
            <div class="grid mb-8 mt-5 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Very easy this was to integrate</h3>
                        <p class="my-4 font-light">If you care for your time, I hands down would go with this."</p>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Bonnie Green</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Developer at Open AI</div>
                        </div>
                    </figcaption>
                </figure>
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-tr-lg dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Solid foundation for any project</h3>
                        <p class="my-4 font-light">Designing with Figma components that can be easily translated to the utility classes of Tailwind CSS is a huge timesaver!"</p>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Roberta Casas</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Lead designer at Dropbox</div>
                        </div>
                    </figcaption>
                </figure>
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-bl-lg md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Mindblowing workflow</h3>
                        <p class="my-4 font-light">Aesthetically, the well designed components are beautiful and will undoubtedly level up your next application."</p>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Jese Leos</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">Software Engineer at Facebook</div>
                        </div>
                    </figcaption>
                </figure>
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-br-lg dark:bg-gray-800 dark:border-gray-700">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Efficient Collaborating</h3>
                        <p class="my-4 font-light">You have many examples that can be used to create a fast prototype for your team."</p>
                    </blockquote>
                    <figcaption class="flex items-center justify-center space-x-3">
                        <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="profile picture" />
                        <div class="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Joseph McFall</div>
                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">CTO at Google</div>
                        </div>
                    </figcaption>
                </figure>
            </div>
            <img className={styles.imagen} src={kpo} alt="girl" />
        </section>
    )
}
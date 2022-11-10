import styles from "./InfoService.module.css";

export const InfoService = () => {
  return (
    <section className={styles.infocontainer}>
      <div className={styles.leftpurple}>
        <h1>¿Por qué elegirnos?</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          sunt distinctio maiores quasi qui necessitatibus nemo architecto est
          eligendi? Veritatis tempore beatae, soluta assumenda obcaecati amet
          magnam dolore error laborum. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Eos exercitationem cupiditate, dicta quo repellendus
          deleniti fuga, tempore perferendis facere architecto voluptatem
          nesciunt, repudiandae quas molestiae nam sint? Quia, pariatur hic?
        </p>
      </div>
      <div className={styles.rigthpurple}>
        <div className={styles.points}>
          <h1>1</h1>
          <span>Una plataforma segura</span>
        </div>
        <div className={styles.points}>
          <h1>2</h1>
          <span>Promocionamos tu clase</span>
        </div>
        <div className={styles.points}>
          <h1>3</h1>
          <span>Estudia lo que te guste</span>
        </div>
      </div>
    </section>
  );
};

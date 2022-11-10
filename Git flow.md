# Git Flow

## Tipico workflow para mi rama

- Nos posicionamos en la rama fulanito con:

```
git checkout fulanito
```

- Vemos todas las ramas creadas con: (Veremos con un asterizco la roma donde estamos parados actualmente.)

```
git branch
```

- Nos traemos todos los últimos cambios que se hayas subido a main en GitHub con:

```
git pull
```

> en caso de querer descargar los cambios de otra rama `git pull origin <nombre de la rama>`

- Creamos una nueva rama **Y** nos posicionamos sobre la misma automaticamente.

```
git checkout -b <nombreRama>
```

- vemos que archivos fueron modificados y están listos para ser
  agregados a un nuevo commit con:

```
git status
```

- Añadimos el archivo indicado al
  nuevo commit con:

```
git add <nombreDeArchivoModificado>
```

Podemos encontrarnos frente a un error, esto puede deberse a que para hacer `git add <nombre del archivo>` hay que:

O bien estar parado en el directorio correspondiente en la terminal.

O bien introducir el comnado `git status` y copiar la ruta del archivo que queremos modificar.

> Evitar usar el commando `"git add ."` para ser conciente de lo que se modifica para ese commit y lograr commits mas modularizados.

- Subimos los cambios a la
  rama remota del repositorio con:

```
git push -u origin <nombreRamaDeTrabajo>
```

---

## Pull request (PR)

### Workflow para solicitar un PR

1. Me paro en la rama main de mi compu.
2. Me traigo los cambios que haya en github.
3. Cambio a la rama donde quiera trabajar.
4. Hago el merge de main con la rama donde voy a trabajar.
5. Resuelvo confluctos.
6. Trabajo **realizando commits cada vez que resuelvo algo chiquito**.
7. Al finalizar **compruebo que todo ande bien**.
8. Pusheo la rama donde trabajé a github.
9. Hago el pull request.

### Arreglar correcciones propuedas

> Esto involucra seguir trabajando en mi branch, ir commiteando los cambios y pushearlos. Luego en la cronoloía del PR se ven los commit hechos despues de las correcciones del primer PR solicitado.

---

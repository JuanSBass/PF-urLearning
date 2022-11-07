# Git Flow


## Tipico workflow para mi rama
* Nos posicionamos en la rama fulanito con:
```
git checkout fulanito
```


* Vemos todas las ramas creadas con: (Veremos con un asterizco la roma donde estamos parados actualmente.)
```
git branch
```


* Nos traemos todos los últimos cambios que se hayas subido a GitHub con:
```
git pull
```

* Creamos una nueva rama **Y** nos posicionamos sobre la misma automaticamente. 
```
git checkout -b nombreRama
```

* vemos que archivos fueron modificados y están listos para ser
agregados a un nuevo commit con: 
```
git status
```
* Añadimos el archivo indicado al
nuevo commit. En este caso, si tenemos más de un archivo modificado y
queremos añadir a todos, podemos hacer git add . con el punto al final
para poder añadirlos todos juntos y no ir archivo por archivo con:
```
git add nombreDeArchivoModificado
```
* Subimos los cambios a la
rama remota del repositorio con: 
```
git push -u origin nombreRamaDeTrabajo
```


---
## Pull request (PR)

### Workflow para solicitar un PR

1. Me paro en la rama main de mi compu.
2. me traigo los cambios que haya en github.
3. Cambio a la rama donde quiera trabajar.
4. Hago el merge de main con la rama donde voy a trabajar.
5. Resuelvo confluctos.
6. trabajo **realizando commits cada vez que resuelvo algo chiquito**.
7. Al finalizar **compruebo que todo ande bien**
8. pusheo la rama donde trabajé rama a github
9. hago el pull request.


### Arreglar correcciones propuedas 
> esto involucra seguir trabajando en mi branch, ir commiteando los cambios y pushearlos. Luego en la cronoloía del PR se ven los commit hechos despues de las correcciones del primer PR solicitado.
---
## Revisar Pull Request de otra persona.

```

```
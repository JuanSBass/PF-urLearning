# Sequelize notes

Dejo lo que me parecio que mas nos iba a servir para este PF de la documentación de Sequelize. Es muy probable que la info sea as mas facil de buscar en la documentación oficial, si es que se sabe qué se esta buscando. Si no se sabe, quizás ojear ese documento que solo es de unas 20 hojas de extensión pueda ser de ayuda.


<br>

# Note: logging instances

Trying to log a model instance directly to console.log will produce a lot of clutter, since Sequelize instances have a lot of things attached to them. Instead, you can use the .toJSON() method (which, by the way, automatically guarantees the instances to be JSON.stringify-ed well).

```js
const jane = await User.create({ name: "Jane" });
// console.log(jane); // Don't do this
console.log(jane.toJSON()); // This is good!
console.log(JSON.stringify(jane, null, 4)); // This is also good!
```



<br>

# Applying WHERE clauses

The where option is used to filter the query. There are lots of operators to use for the where clause, available as Symbols from Op.
The basics
```js
Post.findAll({
  where: {
    authorId: 2
  }
});
// SELECT * FROM post WHERE authorId = 2;
```
Observe that no operator (from Op) was explicitly passed, so Sequelize assumed an equality comparison by default. The above code is equivalent to:
```js
const { Op } = require("sequelize");
Post.findAll({
  where: {
    authorId: {
      [Op.eq]: 2
    }
  }
});
// SELECT * FROM post WHERE authorId = 2;
```
Multiple checks can be passed:

```js
Post.findAll({
  where: {
    authorId: 12,
    status: 'active'
  }
});
// SELECT * FROM post WHERE authorId = 12 AND status = 'active';

```

Just like Sequelize inferred the Op.eq operator in the first example, here Sequelize inferred that the caller wanted an AND for the two checks. The code above is equivalent to:

```js
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [
      { authorId: 12 },
      { status: 'active' }
    ]
  }
});
// SELECT * FROM post WHERE authorId = 12 AND status = 'active';
```
An OR can be easily performed in a similar way:
```js
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.or]: [
      { authorId: 12 },
      { authorId: 13 }
    ]
  }
});
// SELECT * FROM post WHERE authorId = 12 OR authorId = 13;
```
Since the above was an OR involving the same field, Sequelize allows you to use a slightly different structure which is more readable and generates the same behavior:
```js
const { Op } = require("sequelize");
Post.destroy({
  where: {
    authorId: {
      [Op.or]: [12, 13]
    }
  }
});
// DELETE FROM post WHERE authorId = 12 OR authorId = 13;
```
<br>

## Operators

Sequelize provides several operators.
```js
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
    someAttribute: {
      // Basics
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

      // Using dialect specific column identifiers (PG in the following example):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"

      // Number comparisons
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

      // Other operators

      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (case insensitive) (PG only)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (PG only)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (PG only)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (PG only)

      [Op.any]: [2, 3],                        // ANY (ARRAY[2, 3]::INTEGER[]) (PG only)
      [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // match text search for strings 'fat' and 'rat' (PG only)

      // In Postgres, Op.like/Op.iLike/Op.notLike can be combined to Op.any:
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY (ARRAY['cat', 'hat'])

      // There are more postgres-only range operators, see below
    }
  }
});
```

Shorthand syntax for Op.in

Passing an array directly to the where option will implicitly use the IN operator:
```js
Post.findAll({
  where: {
    id: [1,2,3] // Same as using `id: { [Op.in]: [1,2,3] }`
  }
});
// SELECT ... FROM "posts" AS "post" WHERE "post"."id" IN (1, 2, 3);
```
<br>

## Logical combinations with operators

The operators Op.and, Op.or and Op.not can be used to create arbitrarily complex nested logical comparisons.
Examples with Op.and and Op.or
```js
const { Op } = require("sequelize");

Foo.findAll({
  where: {
    rank: {
      [Op.or]: {
        [Op.lt]: 1000,
        [Op.eq]: null
      }
    },
    // rank < 1000 OR rank IS NULL

    {
      createdAt: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
      }
    },
    // createdAt < [timestamp] AND createdAt > [timestamp]

    {
      [Op.or]: [
        {
          title: {
            [Op.like]: 'Boat%'
          }
        },
        {
          description: {
            [Op.like]: '%boat%'
          }
        }
      ]
    }
    // title LIKE 'Boat%' OR description LIKE '%boat%'
  }
});
```
Examples with Op.not
```js
Project.findAll({
  where: {
    name: 'Some Project',
    [Op.not]: [
      { id: [1,2,3] },
      {
        description: {
          [Op.like]: 'Hello%'
        }
      }
    ]
  }
});
```
The above will generate:
```js
SELECT *
FROM `Projects`
WHERE (
  `Projects`.`name` = 'Some Project'
  AND NOT (
    `Projects`.`id` IN (1,2,3)
    AND
    `Projects`.`description` LIKE 'Hello%'
  )
)
```
<br>

## Postgres-only Range Operators

Range types can be queried with all supported operators.

Keep in mind, the provided range value can define the bound inclusion/exclusion as well.

```js
[Op.contains]: 2,            // @> '2'::integer  (PG range contains element operator)
[Op.contains]: [1, 2],       // @> [1, 2)        (PG range contains range operator)
[Op.contained]: [1, 2],      // <@ [1, 2)        (PG range is contained by operator)
[Op.overlap]: [1, 2],        // && [1, 2)        (PG range overlap (have points in common) operator)
[Op.adjacent]: [1, 2],       // -|- [1, 2)       (PG range is adjacent to operator)
[Op.strictLeft]: [1, 2],     // << [1, 2)        (PG range strictly left of operator)
[Op.strictRight]: [1, 2],    // >> [1, 2)        (PG range strictly right of operator)
[Op.noExtendRight]: [1, 2],  // &< [1, 2)        (PG range does not extend to the right of operator)
[Op.noExtendLeft]: [1, 2],   // &> [1, 2)        (PG range does not extend to the left of operator)
```
---
<br>

# Simple UPDATE queries

Update queries also accept the where option, just like the read queries shown above.

```js
// Change everyone without a last name to "Doe"
await User.update({ lastName: "Doe" }, {
  where: {
    lastName: null
  }
});
```

<br>

# Model Querying - Finders

Finder methods are the ones that generate SELECT queries.

By default, the results of all finder methods are instances of the model class (as opposed to being just plain JavaScript objects). This means that after the database returns the results, Sequelize automatically wraps everything in proper instance objects. In a few cases, when there are too many results, this wrapping can be inefficient. To disable this wrapping and receive a plain response instead, pass { raw: true } as an option to the finder method.
findAll


The findByPk method obtains only a single entry from the table, using the provided primary key.

```js
const project = await Project.findByPk(123);
if (project === null) {
  console.log('Not found!');
} else {
  console.log(project instanceof Project); // true
  // Its primary key is 123
}
```
<br> 

## findOne

The findOne method obtains the first entry it finds (that fulfills the optional query options, if provided).

```js
const project = await Project.findOne({ where: { title: 'My Title' } });
if (project === null) {
  console.log('Not found!');
} else {
  console.log(project instanceof Project); // true
  console.log(project.title); // 'My Title'
}
```
<br> 


## findOrCreate

The method findOrCreate will create an entry in the table unless it can find one fulfilling the query options. In both cases, it will return an instance (either the found instance or the created instance) and a boolean indicating whether that instance was created or already existed.

The where option is considered for finding the entry, and the defaults option is used to define what must be created in case nothing was found. If the defaults do not contain values for every column, Sequelize will take the values given to where (if present).

Let's assume we have an empty database with a User model which has a username and a job.

```js
const [user, created] = await User.findOrCreate({
  where: { username: 'sdepold' },
  defaults: {
    job: 'Technical Lead JavaScript'
  }
});
console.log(user.username); // 'sdepold'
console.log(user.job); // This may or may not be 'Technical Lead JavaScript'
console.log(created); // The boolean indicating whether this instance was just created
if (created) {
  console.log(user.job); // This will certainly be 'Technical Lead JavaScript'
}
```
<br>


# Defining the Sequelize associations

The four association types are defined in a very similar way. Let's say we have two models, A and B. Telling Sequelize that you want an association between the two needs just a function call:

```js
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);


A.hasOne(B); // A HasOne B
A.belongsTo(B); // A BelongsTo B
A.hasMany(B); // A HasMany B
A.belongsToMany(B, { through: 'C' }); // A BelongsToMany B through the junction table C

```

They all accept an options object as a second parameter (optional for the first three, mandatory for belongsToMany containing at least the through property):

```js
A.hasOne(B, { /* options */ });
A.belongsTo(B, { /* options */ });
A.hasMany(B, { /* options */ });
A.belongsToMany(B, { through: 'C', /* options */ });
```
<br>

> ### The order in which the association is defined is relevant. In other words, the order matters, for the four cases. In all examples above, A is called the source model and B is called the target model. This terminology is important.

<br>

* The `A.hasOne(B)` association means that a `One-To-One` relationship exists between A and B, with the **foreign key being defined in the target model (B)**.

* The `A.belongsTo(B)` association means that a `One-To-One` relationship exists between A and B, with the foreign key being defined in the source model (A).

* The `A.hasMany(B`) association means that a `One-To-Many` relationship exists between A and B, with the foreign key being defined in the target model (B).

> These three calls will cause Sequelize to automatically add <mark>foreign keys</mark> to the appropriate models (unless they are already present).

* The `A.belongsToMany(B, { through: 'C' })` association means that a `Many-To-Many` relationship exists between A and B, **using table C as junction table, which will have the foreign keys (aId and bId, for example). Sequelize will automatically create this model C (unless it already exists) and define the appropriate foreign keys on it.**

*Note: In the examples above for belongsToMany, a string ('C') was passed to the through option. In this case, Sequelize automatically generates a model with this name. However, you can also pass a model directly, if you have already defined it.*

These are the main ideas involved in each type of association. However, these relationships are often used in pairs, in order to enable better usage with Sequelize. 

<br>

## Creating the standard relationships


* To create a One-To-One relationship, the **hasOne and belongsTo associations are used together**;
* To create a One-To-Many relationship, the **hasMany and belongsTo associations are used together**;
* To create a Many-To-Many relationship, **two belongsToMany calls are used together**.

<br>

*Note: there is also a Super Many-To-Many relationship, which uses six associations at once, and will be discussed in the Advanced Many-to-Many relationships guide.*

<br>

## Customizing the foreign key

Both the hasOne and belongsTo calls shown above will infer that the foreign key to be created should be called fooId. To use a different name, such as myFooId:
```js
// Option 1
Foo.hasOne(Bar, {
  foreignKey: 'myFooId'
});
Bar.belongsTo(Foo);

// Option 2
Foo.hasOne(Bar, {
  foreignKey: {
    name: 'myFooId'
  }
});
Bar.belongsTo(Foo);

// Option 3
Foo.hasOne(Bar);
Bar.belongsTo(Foo, {
  foreignKey: 'myFooId'
});

// Option 4
Foo.hasOne(Bar);
Bar.belongsTo(Foo, {
  foreignKey: {
    name: 'myFooId'
  }
});
```
<br> 

# Fetching associations - Eager Loading vs Lazy Loading

The concepts of Eager Loading and Lazy Loading are fundamental to understand how fetching associations work in Sequelize. Lazy Loading refers to the technique of fetching the associated data only when you really want it; Eager Loading, on the other hand, refers to the technique of fetching everything at once, since the beginning, with a larger query.

<br>

## Lazy Loading example
```js
const awesomeCaptain = await Captain.findOne({
  where: {
    name: "Jack Sparrow"
  }
});
// Do stuff with the fetched captain
console.log('Name:', awesomeCaptain.name);
console.log('Skill Level:', awesomeCaptain.skillLevel);
// Now we want information about his ship!
const hisShip = await awesomeCaptain.getShip();
// Do stuff with the ship
console.log('Ship Name:', hisShip.name);
console.log('Amount of Sails:', hisShip.amountOfSails);
```

Observe that in the example above, we made two queries, only fetching the associated ship when we wanted to use it. This can be especially useful if we may or may not need the ship, perhaps we want to fetch it conditionally, only in a few cases; this way we can save time and memory by only fetching it when necessary.

*Note: the getShip() instance method used above is one of the methods Sequelize automatically adds to Captain instances. There are others.*

<br>

## Eager Loading Example
```js
const awesomeCaptain = await Captain.findOne({
  where: {
    name: "Jack Sparrow"
  },
  include: Ship
});
// Now the ship comes with it
console.log('Name:', awesomeCaptain.name);
console.log('Skill Level:', awesomeCaptain.skillLevel);
console.log('Ship Name:', awesomeCaptain.ship.name);
console.log('Amount of Sails:', awesomeCaptain.ship.amountOfSails);
```

As shown above, Eager Loading is performed in Sequelize by using the include option. Observe that here only one query was performed to the database (which brings the associated data along with the instance).

*This was just a quick introduction to Eager Loading in Sequelize. There is a lot more to it*

<br>

--- 

<br><br>

# <mark>Challenge section</mark>
## <mark>If you wanto to be a pro , learn the next info</mark>

<br>

## Association Aliases & Custom Foreign Keys

In all the above examples, Sequelize automatically defined the foreign key names. For example, in the Ship and Captain example, Sequelize automatically defined a captainId field on the Ship model. However, it is easy to specify a custom foreign key.

Let's consider the models Ship and Captain in a simplified form, just to focus on the current topic, as shown below (less fields):

```js
const Ship = sequelize.define('ship', { name: DataTypes.TEXT }, { timestamps: false });
const Captain = sequelize.define('captain', { name: DataTypes.TEXT }, { timestamps: false });
```

There are three ways to specify a different name for the foreign key:

* By providing the foreign key name directly
* By defining an Alias
* By doing both things

---

Recap: the default setup

By using simply `Ship.belongsTo(Captain)`, sequelize will generate the foreign key name automatically:

```js
Ship.belongsTo(Captain); // This creates the `captainId` foreign key in Ship.

// Eager Loading is done by passing the model to `include`:
console.log((await Ship.findAll({ include: Captain })).toJSON());
// Or by providing the associated model name:
console.log((await Ship.findAll({ include: 'captain' })).toJSON());

// Also, instances obtain a `getCaptain()` method for Lazy Loading:
const ship = Ship.findOne();
console.log((await ship.getCaptain()).toJSON());
```
---

<br>

## Providing the foreign key name directly

The foreign key name can be provided directly with an option in the association definition, as follows:

```js
Ship.belongsTo(Captain, { foreignKey: 'bossId' }); // This creates the `bossId` foreign key in Ship.

// Eager Loading is done by passing the model to `include`:
console.log((await Ship.findAll({ include: Captain })).toJSON());
// Or by providing the associated model name:
console.log((await Ship.findAll({ include: 'Captain' })).toJSON());

// Also, instances obtain a `getCaptain()` method for Lazy Loading:
const ship = Ship.findOne();
console.log((await ship.getCaptain()).toJSON());
```

<br>

## Defining an Alias

Defining an Alias is more powerful than simply specifying a custom name for the foreign key. This is better understood with an example:

```js
Ship.belongsTo(Captain, { as: 'leader' }); // This creates the `leaderId` foreign key in Ship.

// Eager Loading no longer works by passing the model to `include`:
console.log((await Ship.findAll({ include: Captain })).toJSON()); // Throws an error
// Instead, you have to pass the alias:
console.log((await Ship.findAll({ include: 'leader' })).toJSON());
// Or you can pass an object specifying the model and alias:
console.log((await Ship.findAll({
  include: {
    model: Captain,
    as: 'leader'
  }
})).toJSON());

// Also, instances obtain a `getLeader()` method for Lazy Loading:
const ship = Ship.findOne();
console.log((await ship.getLeader()).toJSON());
```

Aliases are especially useful when you need to define two different associations between the same models. For example, if we have the models Mail and Person, we may want to associate them twice, to represent the sender and receiver of the Mail. In this case we must use an alias for each association, since otherwise a call like mail.`getPerson()` would be ambiguous. With the sender and receiver aliases, we would have the two methods available and working: mail.`getSender()` and `mail.getReceiver()`, both of them returning a Promise\<Person>.

When defining an alias for a hasOne or belongsTo association, you should use the singular form of a word (such as leader, in the example above). On the other hand, when defining an alias for hasMany and belongsToMany, you should use the plural form. Defining aliases for Many-to-Many relationships (with belongsToMany) is covered in the Advanced Many-to-Many Associations guide.
Doing both things

**We can define and alias and also directly define the foreign key:**

```js
Ship.belongsTo(Captain, { as: 'leader', foreignKey: 'bossId' }); // This creates the `bossId` foreign key in Ship.

// Since an alias was defined, eager Loading doesn't work by simply passing the model to `include`:
console.log((await Ship.findAll({ include: Captain })).toJSON()); // Throws an error
// Instead, you have to pass the alias:
console.log((await Ship.findAll({ include: 'leader' })).toJSON());
// Or you can pass an object specifying the model and alias:
console.log((await Ship.findAll({
  include: {
    model: Captain,
    as: 'leader'
  }
})).toJSON());

// Also, instances obtain a `getLeader()` method for Lazy Loading:
const ship = Ship.findOne();
console.log((await ship.getLeader()).toJSON());
``` 

<mark> END OF CHALLENGE SECTION </mark>

---

<br>

# Special methods/mixins added to instances [VERY IMPORTANT SECTION]

When an association is defined between two models, the instances of those models gain special methods to interact with their associated counterparts.

For example, if we have two models, Foo and Bar, and they are associated, their instances will have the following methods/mixins available, depending on the association type:
Foo.hasOne(Bar)

    fooInstance.getBar()
    fooInstance.setBar()
    fooInstance.createBar()

Example:
```js
const foo = await Foo.create({ name: 'the-foo' });
const bar1 = await Bar.create({ name: 'some-bar' });
const bar2 = await Bar.create({ name: 'another-bar' });
console.log(await foo.getBar()); // null
await foo.setBar(bar1);
console.log((await foo.getBar()).name); // 'some-bar'
await foo.createBar({ name: 'yet-another-bar' });
const newlyAssociatedBar = await foo.getBar();
console.log(newlyAssociatedBar.name); // 'yet-another-bar'
await foo.setBar(null); // Un-associate
console.log(await foo.getBar()); // null

Foo.belongsTo(Bar)
```

The same ones from Foo.hasOne(Bar):
```js
    fooInstance.getBar()
    fooInstance.setBar()
    fooInstance.createBar()
```
Foo.hasMany(Bar)
```js
    fooInstance.getBars()
    fooInstance.countBars()
    fooInstance.hasBar()
    fooInstance.hasBars()
    fooInstance.setBars()
    fooInstance.addBar()
    fooInstance.addBars()
    fooInstance.removeBar()
    fooInstance.removeBars()
    fooInstance.createBar()
```
Example:
```js
const foo = await Foo.create({ name: 'the-foo' });
const bar1 = await Bar.create({ name: 'some-bar' });
const bar2 = await Bar.create({ name: 'another-bar' });
console.log(await foo.getBars()); // []
console.log(await foo.countBars()); // 0
console.log(await foo.hasBar(bar1)); // false
await foo.addBars([bar1, bar2]);
console.log(await foo.countBars()); // 2
await foo.addBar(bar1);
console.log(await foo.countBars()); // 2
console.log(await foo.hasBar(bar1)); // true
await foo.removeBar(bar2);
console.log(await foo.countBars()); // 1
await foo.createBar({ name: 'yet-another-bar' });
console.log(await foo.countBars()); // 2
await foo.setBars([]); // Un-associate all previously associated bars
console.log(await foo.countBars()); // 0
```
The getter method accepts options just like the usual finder methods (such as findAll):
```js
const easyTasks = await project.getTasks({
  where: {
    difficulty: {
      [Op.lte]: 5
    }
  }
});
const taskTitles = (await project.getTasks({
  attributes: ['title'],
  raw: true
})).map(task => task.title);

Foo.belongsToMany(Bar, { through: Baz })
```
The same ones from Foo.hasMany(Bar):

    fooInstance.getBars()
    fooInstance.countBars()
    fooInstance.hasBar()
    fooInstance.hasBars()
    fooInstance.setBars()
    fooInstance.addBar()
    fooInstance.addBars()
    fooInstance.removeBar()
    fooInstance.removeBars()
    fooInstance.createBar()

For belongsToMany relationships, by default getBars() will return all fields from the join table. Note that any include options will apply to the target Bar object, so trying to set options for the join table as you would when eager loading with find methods is not possible. To choose what attributes of the join table to include, getBars() supports a joinTableAttributes option that can be used similarly to setting through.attributes in an include. As an example, given Foo belongsToMany Bar, the following will both output results without join table fields:
```js
const foo = Foo.findByPk(id, {
  include: [{
    model: Bar,
    through: { attributes: [] }
  }]
})
console.log(foo.bars)

const foo = Foo.findByPk(id)
console.log(foo.getBars({ joinTableAttributes: [] }))
```

---

<br>

# Paranoid [BORRADO LOGICO?]

Sequelize supports the concept of paranoid tables. A paranoid table is one that, when told to delete a record, it will not truly delete it. Instead, a special column called deletedAt will have its value set to the timestamp of that deletion request.

This means that paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
Defining a model as paranoid

To make a model paranoid, you must pass the paranoid: true option to the model definition. Paranoid requires timestamps to work (i.e. it won't work if you also pass timestamps: false).

You can also change the default column name (which is deletedAt) to something else.

```js
class Post extends Model {}
Post.init({ /* attributes here */ }, {
  sequelize,
  paranoid: true,

  // If you want to give a custom name to the deletedAt column
  deletedAt: 'destroyTime'
});
```
<BR>

## Deleting

When you call the destroy method, a soft-deletion will happen:
```js
await Post.destroy({
  where: {
    id: 1
  }
});
// UPDATE "posts" SET "deletedAt"=[timestamp] WHERE "deletedAt" IS NULL AND "id" = 1
```
If you really want a hard-deletion and your model is paranoid, you can force it using the force: true option:
```js
await Post.destroy({
  where: {
    id: 1
  },
  force: true
});
// DELETE FROM "posts" WHERE "id" = 1
```
The above examples used the static destroy method as an example (Post.destroy), but everything works in the same way with the instance method:
```js
const post = await Post.create({ title: 'test' });
console.log(post instanceof Post); // true
await post.destroy(); // Would just set the `deletedAt` flag
await post.destroy({ force: true }); // Would really delete the record
```

<BR>

## Restoring

To restore soft-deleted records, you can use the restore method, which comes both in the static version as well as in the instance version:

```js
// Example showing the instance `restore` method
// We create a post, soft-delete it and then restore it back
const post = await Post.create({ title: 'test' });
console.log(post instanceof Post); // true
await post.destroy();
console.log('soft-deleted!');
await post.restore();
console.log('restored!');

// Example showing the static `restore` method.
// Restoring every soft-deleted post with more than 100 likes
await Post.restore({
  where: {
    likes: {
      [Op.gt]: 100
    }
  }
});
```

## Behavior with other queries

Every query performed by Sequelize will automatically ignore soft-deleted records (except raw queries, of course).

This means that, for example, the findAll method will not see the soft-deleted records, fetching only the ones that were not deleted.

Even if you simply call findByPk providing the primary key of a soft-deleted record, the result will be null as if that record didn't exist.

If you really want to let the query see the soft-deleted records, you can pass the paranoid: false option to the query method. For example:
```js
await Post.findByPk(123); // This will return `null` if the record of id 123 is soft-deleted
await Post.findByPk(123, { paranoid: false }); // This will retrieve the record

await Post.findAll({
  where: { foo: 'bar' }
}); // This will not retrieve soft-deleted records

await Post.findAll({
  where: { foo: 'bar' },
  paranoid: false
}); // This will also retrieve soft-deleted records```
```

# Eager Loading

As briefly mentioned in the associations guide, eager Loading is the act of querying data of several models at once (one 'main' model and one or more associated models). At the SQL level, this is a query with one or more joins.

When this is done, the associated models will be added by Sequelize in appropriately named, automatically created field(s) in the returned objects.

In Sequelize, eager loading is mainly done by using the include option on a model finder query (such as findOne, findAll, etc).
Basic example

Let's assume the following setup:

const User = sequelize.define('user', { name: DataTypes.STRING }, { timestamps: false });
const Task = sequelize.define('task', { name: DataTypes.STRING }, { timestamps: false });
const Tool = sequelize.define('tool', {
  name: DataTypes.STRING,
  size: DataTypes.STRING
}, { timestamps: false });
User.hasMany(Task);
Task.belongsTo(User);
User.hasMany(Tool, { as: 'Instruments' });

Fetching a single associated element

OK. So, first of all, let's load all tasks with their associated user:

const tasks = await Task.findAll({ include: User });
console.log(JSON.stringify(tasks, null, 2));

Output:

[{
  "name": "A Task",
  "id": 1,
  "userId": 1,
  "user": {
    "name": "John Doe",
    "id": 1
  }
}]

Here, tasks[0].user instanceof User is true. This shows that when Sequelize fetches associated models, they are added to the output object as model instances.

Above, the associated model was added to a new field called user in the fetched task. The name of this field was automatically chosen by Sequelize based on the name of the associated model, where its pluralized form is used when applicable (i.e., when the association is hasMany or belongsToMany). In other words, since Task.belongsTo(User), a task is associated to one user, therefore the logical choice is the singular form (which Sequelize follows automatically).
Fetching all associated elements

Now, instead of loading the user that is associated to a given task, we will do the opposite - we will find all tasks associated to a given user.

The method call is essentially the same. The only difference is that now the extra field created in the query result uses the pluralized form (tasks in this case), and its value is an array of task instances (instead of a single instance, as above).

const users = await User.findAll({ include: Task });
console.log(JSON.stringify(users, null, 2));

Output:

[{
  "name": "John Doe",
  "id": 1,
  "tasks": [{
    "name": "A Task",
    "id": 1,
    "userId": 1
  }]
}]

Notice that the accessor (the tasks property in the resulting instance) is pluralized since the association is one-to-many.



Eager loading filtered at the associated model level

When eager loading, we can also filter the associated model using the where option, as in the following example:

User.findAll({
  include: {
    model: Tool,
    as: 'Instruments'
    where: {
      size: {
        [Op.ne]: 'small'
      }
    }
  }
});
```


> No esta incluido el right outer join ni sus variantes, para eso ver la documentacicon oficial


Eager loading with Many-to-Many relationships

When you perform eager loading on a model with a Belongs-to-Many relationship, Sequelize will fetch the junction table data as well, by default. For example:

const Foo = sequelize.define('Foo', { name: DataTypes.TEXT });
const Bar = sequelize.define('Bar', { name: DataTypes.TEXT });
Foo.belongsToMany(Bar, { through: 'Foo_Bar' });
Bar.belongsToMany(Foo, { through: 'Foo_Bar' });

await sequelize.sync();
const foo = await Foo.create({ name: 'foo' });
const bar = await Bar.create({ name: 'bar' });
await foo.addBar(bar);
const fetchedFoo = await Foo.findOne({ include: Bar });
console.log(JSON.stringify(fetchedFoo, null, 2));

Output:

{
  "id": 1,
  "name": "foo",
  "Bars": [
    {
      "id": 1,
      "name": "bar",
      "Foo_Bar": {
        "FooId": 1,
        "BarId": 1
      }
    }
  ]
}

Note that every bar instance eager loaded into the "Bars" property has an extra property called Foo_Bar which is the relevant Sequelize instance of the junction model. By default, Sequelize fetches all attributes from the junction table in order to build this extra property.

However, you can specify which attributes you want fetched. This is done with the attributes option applied inside the through option of the include. For example:

Foo.findAll({
  include: [{
    model: Bar,
    through: {
      attributes: [/* list the wanted attributes here */]
    }
  }]
});

If you don't want anything from the junction table, you can explicitly provide an empty array to the attributes option inside the through option of the include option, and in this case nothing will be fetched and the extra property will not even be created:

Foo.findOne({
  include: {
    model: Bar,
    through: {
      attributes: []
    }
  }
});

Output:

{
  "id": 1,
  "name": "foo",
  "Bars": [
    {
      "id": 1,
      "name": "bar"
    }
  ]
}

Whenever including a model from a Many-to-Many relationship, you can also apply a filter on the junction table. This is done with the where option applied inside the through option of the include. For example:

User.findAll({
  include: [{
    model: Project,
    through: {
      where: {
        // Here, `completed` is a column present at the junction table
        completed: true
      }
    }
  }]
});

Generated SQL (using SQLite):

SELECT
  `User`.`id`,
  `User`.`name`,
  `Projects`.`id` AS `Projects.id`,
  `Projects`.`name` AS `Projects.name`,
  `Projects->User_Project`.`completed` AS `Projects.User_Project.completed`,
  `Projects->User_Project`.`UserId` AS `Projects.User_Project.UserId`,
  `Projects->User_Project`.`ProjectId` AS `Projects.User_Project.ProjectId`
FROM `Users` AS `User`
LEFT OUTER JOIN `User_Projects` AS `Projects->User_Project` ON
  `User`.`id` = `Projects->User_Project`.`UserId`
LEFT OUTER JOIN `Projects` AS `Projects` ON
  `Projects`.`id` = `Projects->User_Project`.`ProjectId` AND
  `Projects->User_Project`.`completed` = 1;

Including everything

To include all associated models, you can use the all and nested options:

// Fetch all models associated with User
User.findAll({ include: { all: true }});

// Fetch all models associated with User and their nested associations (recursively)
User.findAll({ include: { all: true, nested: true }});

Including soft deleted records

In case you want to eager load soft deleted records you can do that by setting include.paranoid to false:

User.findAll({
  include: [{
    model: Tool,
    as: 'Instruments',
    where: { size: { [Op.ne]: 'small' } },
    paranoid: false
  }]
});

Advanced M:N Associations

Make sure you have read the associations guide before reading this guide.

Let's start with an example of a Many-to-Many relationship between User and Profile.

const User = sequelize.define('user', {
  username: DataTypes.STRING,
  points: DataTypes.INTEGER
}, { timestamps: false });
const Profile = sequelize.define('profile', {
  name: DataTypes.STRING
}, { timestamps: false });

The simplest way to define the Many-to-Many relationship is:

User.belongsToMany(Profile, { through: 'User_Profiles' });
Profile.belongsToMany(User, { through: 'User_Profiles' });

By passing a string to through above, we are asking Sequelize to automatically generate a model named User_Profiles as the through table (also known as junction table), with only two columns: userId and profileId. A composite unique key will be established on these two columns.

We can also define ourselves a model to be used as the through table.

const User_Profile = sequelize.define('User_Profile', {}, { timestamps: false });
User.belongsToMany(Profile, { through: User_Profile });
Profile.belongsToMany(User, { through: User_Profile });

The above has the exact same effect. Note that we didn't define any attributes on the User_Profile model. The fact that we passed it into a belongsToMany call tells sequelize to create the two attributes userId and profileId automatically, just like other associations also cause Sequelize to automatically add a column to one of the involved models.

However, defining the model by ourselves has several advantages. We can, for example, define more columns on our through table:

const User_Profile = sequelize.define('User_Profile', {
  selfGranted: DataTypes.BOOLEAN
}, { timestamps: false });
User.belongsToMany(Profile, { through: User_Profile });
Profile.belongsToMany(User, { through: User_Profile });

With this, we can now track an extra information at the through table, namely the selfGranted boolean. For example, when calling the user.addProfile() we can pass values for the extra columns using the through option.

Example:

const amidala = await User.create({ username: 'p4dm3', points: 1000 });
const queen = await Profile.create({ name: 'Queen' });
await amidala.addProfile(queen, { through: { selfGranted: false } });
const result = await User.findOne({
  where: { username: 'p4dm3' },
  include: Profile
});
console.log(result);

Output:

{
  "id": 4,
  "username": "p4dm3",
  "points": 1000,
  "profiles": [
    {
      "id": 6,
      "name": "queen",
      "User_Profile": {
        "userId": 4,
        "profileId": 6,
        "selfGranted": false
      }
    }
  ]
}

You can create all relationship in single create call too.

Example:

const amidala = await User.create({
  username: 'p4dm3',
  points: 1000,
  profiles: [{
    name: 'Queen',
    User_Profile: {
      selfGranted: true
    }
  }]
}, {
  include: Profile
});

const result = await User.findOne({
  where: { username: 'p4dm3' },
  include: Profile
});

console.log(result);

Output:

{
  "id": 1,
  "username": "p4dm3",
  "points": 1000,
  "profiles": [
    {
      "id": 1,
      "name": "Queen",
      "User_Profile": {
        "selfGranted": true,
        "userId": 1,
        "profileId": 1
      }
    }
  ]
}

You probably noticed that the User_Profiles table does not have an id field. As mentioned above, it has a composite unique key instead. The name of this composite unique key is chosen automatically by Sequelize but can be customized with the uniqueKey option:

User.belongsToMany(Profile, { through: User_Profiles, uniqueKey: 'my_custom_unique' });

Another possibility, if desired, is to force the through table to have a primary key just like other standard tables. To do this, simply define the primary key in the model:

const User_Profile = sequelize.define('User_Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  selfGranted: DataTypes.BOOLEAN
}, { timestamps: false });
User.belongsToMany(Profile, { through: User_Profile });
Profile.belongsToMany(User, { through: User_Profile });

The above will still create two columns userId and profileId, of course, but instead of setting up a composite unique key on them, the model will use its id column as primary key. Everything else will still work just fine.
export async function up(pgm) {

  pgm.createExtension(
    "pgcrypto",
    {
      ifNotExists: true
    }
  );


  pgm.createTable("tasks", {

    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func(
        "gen_random_uuid()"
      )
    },

    title: {
      type: "varchar(255)",
      notNull: true
    },

    description: {
      type: "text"
    },

    due_date: {
      type: "date"
    },

    completed: {
      type: "boolean",
      notNull: true,
      default: false
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()")
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()")
    }

  });

}

export async function down(pgm) {

  pgm.dropTable(
    "tasks"
  );

}
export async function up(pgm) {

  pgm.createTable("users", {

    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func(
        "gen_random_uuid()"
      )
    },

    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true
    },

    password_hash: {
      type: "text",
      notNull: true
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

  pgm.dropTable("users");

}
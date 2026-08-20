export async function up(pgm) {

  pgm.addColumn("tasks", {

    user_id: {
      type: "uuid",
      references: "users(id)",
      onDelete: "CASCADE"
    }

  });


  pgm.createIndex(
    "tasks",
    "user_id"
  );

}


export async function down(pgm) {

  pgm.dropColumn(
    "tasks",
    "user_id"
  );

}
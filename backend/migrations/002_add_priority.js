export async function up(pgm) {

  pgm.addColumn("tasks", {

    priority: {
      type: "varchar(10)",
      notNull: true,
      default: "medium"
    }

  });

}

export async function down(pgm) {

  pgm.dropColumn(
    "tasks",
    "priority"
  );

}
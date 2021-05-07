import { Model } from '@modules/database/core/orm/model';
import { Relationship } from '@modules/database/core/orm/relation/relationship';
import { Pivot } from '@modules/database/core/orm/interfaces/relation';
import { Database } from '@modules/database/core/database';
import { container } from 'tsyringe';

export class BelongsToMany extends Relationship {
  /**
   *
   * @param table name of table having the relationship.
   * @param relatedModel related model.
   * @param assetKey asset key in pivot table of the relationship.
   * @param ownerKey owner key in pivot table of the relationship.
   * @param pivot information of pivot table.
   */
  public constructor(
    table: string,
    relatedModel: Model,
    private readonly assetKey = 'id',
    private readonly ownerKey = 'id',
    private readonly pivot: Pivot,
  ) {
    super(table, relatedModel);
  }

  /**
   * Join two tables with conditions.
   *
   * @param table table instance.
   */
  protected withCondition() {
    if (this.pivot.table) {
      container
        .resolve(Database)
        .join(this.pivot.table, 'left join')
        .on([
          [
            `${this.table}.${this.assetKey}`,
            '=',
            `${this.pivot.table}.${this.pivot.assetKey}`,
          ],
        ])
        .join(this.relatedModel.table, 'left join')
        .on([
          [
            `${this.relatedModel.table}.${this.ownerKey}`,
            '=',
            `${this.pivot.table}.${this.pivot.ownerKey}`,
          ],
        ]);
    } else if (this.pivot.model) {
      this.relatedModel.relationship._items[
        this.pivot.name || 'pivot_table'
      ] = {
        model: this.pivot.name || 'pivot_table',
        relationship: undefined,
      };

      container
        .resolve(Database)
        .addSelection(
          ...this.pivot.model.columns.map(
            (c) =>
              `${this.pivot.table}.${c}:${this.relation}-${
                this.pivot.name || 'pivot_table'
              }-${c}`,
          ),
        )
        .join(this.pivot.model.table, 'left join')
        .on([
          [
            `${this.table}.${this.ownerKey}`,
            '=',
            `${this.pivot.model.table}.${this.pivot.ownerKey}`,
          ],
        ])
        .join(this.relatedModel.table, 'left join')
        .on([
          [
            `${this.relatedModel.table}.${this.assetKey}`,
            '=',
            `${this.pivot.model.table}.${this.pivot.assetKey}`,
          ],
        ]);
    } else {
      throw new Error(
        '`model` or `table` must be required in property `pivot`',
      );
    }
  }
}
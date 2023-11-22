"""empty message

Revision ID: d89801a92bde
Revises: 
Create Date: 2023-11-15 16:15:00.459252

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd89801a92bde'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('freelance',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(length=80), nullable=False),
    sa.Column('URLphoto', sa.String(length=200), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('professional_registration_number', sa.String(length=20), nullable=True),
    sa.Column('education', sa.String(length=250), nullable=True),
    sa.Column('expertise', sa.String(length=200), nullable=True),
    sa.Column('aboutme', sa.String(length=300), nullable=True),
    sa.Column('availability', sa.JSON(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('full_name'),
    sa.UniqueConstraint('professional_registration_number')
    )
    op.create_table('order',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(length=60), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('appointment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('freelance_id', sa.Integer(), nullable=True),
    sa.Column('day', sa.String(length=10), nullable=False),
    sa.Column('time', sa.Time(), nullable=False),
    sa.Column('full_date', sa.DateTime(), nullable=True),
    sa.Column('jitsi_room_id', sa.String(length=50), nullable=True),
    sa.ForeignKeyConstraint(['freelance_id'], ['freelance.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('jitsi_room_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('appointment')
    op.drop_table('user')
    op.drop_table('order')
    op.drop_table('freelance')
    # ### end Alembic commands ###
